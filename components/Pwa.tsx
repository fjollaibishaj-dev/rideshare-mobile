"use client";

import { useEffect } from "react";

export default function Pwa() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let aktiv = false;

    const ruajListen = async () => {
      if (!navigator.serviceWorker.controller) return;

      try {
        await fetch("/api/udhetimet", {
          method: "GET",
          cache: "no-store",
        });
      } catch {
        console.log("Lista do të rifreskohet kur të ketë internet.");
      }
    };

    navigator.serviceWorker
      .register("/sw.js")
      .then(async () => {
        await navigator.serviceWorker.ready;

        if (navigator.serviceWorker.controller) {
          aktiv = true;
          await ruajListen();
        }
      })
      .catch((error) => {
        console.error("Service Worker nuk u regjistrua:", error);
      });

    const kurKontrollohet = () => {
      if (!aktiv) {
        aktiv = true;
        void ruajListen();
      }
    };

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      kurKontrollohet
    );

    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        kurKontrollohet
      );
    };
  }, []);

  return (
    <p className="p-4 text-center">
      <a
        href="/offline.html"
        className="font-semibold underline"
      >
        Hap listën e udhëtimeve offline
      </a>
    </p>
  );
}