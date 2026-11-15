"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { WORLD_COUNTRIES, type WorldCountry } from "@/lib/world-countries";
import { allDetailedRegionsList } from "@/lib/earth-catalog";
import { useLanguage } from "@/context/language-context";
import { Icon } from "./icon";

interface CountryComboboxProps {
  selectedCountry: string;
  onSelectCountry: (countryName: string) => void;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function CountryCombobox({ selectedCountry, onSelectCountry }: CountryComboboxProps) {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Mapa de conteo de análogos por país
  const analogCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of allDetailedRegionsList) {
      counts[r.country] = (counts[r.country] || 0) + 1;
    }
    return counts;
  }, []);

  // Lista de países filtrada dinámicamente según la búsqueda
  const filteredCountries = useMemo(() => {
    const query = normalize(searchQuery.trim());

    // Elemento Global
    const globalItem = {
      name: "all",
      displayName: isEn ? "All countries (Global)" : "Todos los países (Global)",
      count: allDetailedRegionsList.length,
      isGlobal: true,
    };

    if (!query) {
      // Sin búsqueda: mostrar opción global + todos los países
      return [
        globalItem,
        ...WORLD_COUNTRIES.map((c) => ({
          name: c.name,
          displayName: isEn ? c.nameEn : c.name,
          count: analogCounts[c.name] || 0,
          isGlobal: false,
        })),
      ];
    }

    // Con búsqueda: filtrar coincidencias por nombre en español o inglés
    const matches: { name: string; displayName: string; count: number; isGlobal: boolean }[] = [];

    if (
      normalize("todos los paises global").includes(query) ||
      normalize("all countries global").includes(query) ||
      normalize("global").includes(query)
    ) {
      matches.push(globalItem);
    }

    for (const c of WORLD_COUNTRIES) {
      const matchNameEs = normalize(c.name).includes(query);
      const matchNameEn = normalize(c.nameEn).includes(query);
      if (matchNameEs || matchNameEn) {
        matches.push({
          name: c.name,
          displayName: isEn ? c.nameEn : c.name,
          count: analogCounts[c.name] || 0,
          isGlobal: false,
        });
      }
    }

    // Ordenar: primero los que tienen análogos auditados, luego por orden alfabético
    return matches.sort((a, b) => {
      if (a.isGlobal) return -1;
      if (b.isGlobal) return 1;
      if (a.count > 0 && b.count === 0) return -1;
      if (b.count > 0 && a.count === 0) return 1;
      return a.displayName.localeCompare(b.displayName, isEn ? "en" : "es");
    });
  }, [searchQuery, analogCounts, isEn]);

  // Actualizar el valor del input cuando cambia la selección externa
  useEffect(() => {
    if (selectedCountry === "all") {
      setSearchQuery("");
    } else {
      setSearchQuery(selectedCountry);
    }
  }, [selectedCountry]);

  // Cerrar al hacer clic fuera del componente
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        // Restaurar texto seleccionado si quedó incompleto
        if (selectedCountry === "all") {
          setSearchQuery("");
        } else {
          setSearchQuery(selectedCountry);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedCountry]);

  // Scroll automático en lista al usar teclas de flecha
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const activeItem = listRef.current.children[highlightedIndex] as HTMLElement | undefined;
    if (activeItem) {
      activeItem.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex, isOpen]);

  function handleSelect(countryName: string) {
    onSelectCountry(countryName);
    if (countryName === "all") {
      setSearchQuery("");
    } else {
      setSearchQuery(countryName);
    }
    setIsOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % filteredCountries.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + filteredCountries.length) % filteredCountries.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredCountries[highlightedIndex];
      if (selected) {
        handleSelect(selected.name);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    }
  }

  return (
    <div className="country-combobox-container" ref={containerRef}>
      <label htmlFor="country-search-input" className="filter-label">
        {isEn ? "Country / Territorial Scope:" : "País / Ámbito de Estudio:"}
      </label>

      <div className="combobox-input-wrapper">
        <div className="combobox-search-icon">
          <Icon name="search" size={14} />
        </div>

        <input
          id="country-search-input"
          ref={inputRef}
          type="text"
          className="country-combobox-input"
          placeholder={
            isEn
              ? "Type a country (e.g. Bolivia, Chile, Spain, Canada…)"
              : "Escribe un país (ej. Bolivia, Chile, España, Canadá…)"
          }
          value={searchQuery}
          onFocus={() => {
            setIsOpen(true);
            setHighlightedIndex(0);
          }}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="country-combobox-dropdown"
        />

        {searchQuery.trim() !== "" && (
          <button
            type="button"
            className="combobox-clear-btn"
            title={isEn ? "Reset to global view" : "Restablecer a vista global"}
            onClick={() => {
              handleSelect("all");
              inputRef.current?.focus();
            }}
          >
            ✕
          </button>
        )}

        <button
          type="button"
          className="combobox-toggle-btn"
          tabIndex={-1}
          onClick={() => {
            setIsOpen((prev) => !prev);
            inputRef.current?.focus();
          }}
          aria-label={
            isOpen
              ? isEn
                ? "Close countries list"
                : "Cerrar lista de países"
              : isEn
              ? "Open countries list"
              : "Abrir lista de países"
          }
        >
          {isOpen ? "▲" : "▼"}
        </button>
      </div>

      {isOpen && (
        <ul
          id="country-combobox-dropdown"
          ref={listRef}
          className="country-combobox-dropdown"
          role="listbox"
        >
          {filteredCountries.length === 0 ? (
            <li className="combobox-empty-message">
              {isEn
                ? `No countries found matching "${searchQuery}"`
                : `No se encontraron países que coincidan con "${searchQuery}"`}
            </li>
          ) : (
            filteredCountries.map((item, index) => {
              const isSelected =
                item.name === selectedCountry ||
                (item.isGlobal && selectedCountry === "all");
              const isHighlighted = index === highlightedIndex;

              return (
                <li
                  key={`${item.name}-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  className={`combobox-option ${isSelected ? "selected" : ""} ${
                    isHighlighted ? "highlighted" : ""
                  }`}
                  onClick={() => handleSelect(item.name)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <span className="combobox-option-name">
                    {item.isGlobal ? (
                      <strong>{item.displayName}</strong>
                    ) : (
                      item.displayName
                    )}
                  </span>

                  {item.count > 0 && (
                    <span className="combobox-analog-badge">
                      {item.count}{" "}
                      {item.count === 1
                        ? isEn
                          ? "analog"
                          : "análogo"
                        : isEn
                        ? "analogs"
                        : "análogos"}
                    </span>
                  )}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}

