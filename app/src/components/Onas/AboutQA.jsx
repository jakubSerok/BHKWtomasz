import React, { useState } from "react";
import VisibilitySensor from "react-visibility-sensor";
import Reveal from "../Animation/Reveal";

const AboutQA = () => {
  const [visible, setVisible] = useState(false);

  const onChange = (isVisible) => {
    if (isVisible) {
      setVisible(true);
    }
  };
  return (
    <Reveal>
      <VisibilitySensor onChange={onChange}>
        <div class="max-w-screen-xl mx-auto px-5 bg-white min-h-sceen pt-[100px]">
          <div class="flex flex-col items-center">
            <h2 class="font-bold text-5xl mt-5 tracking-tight">FAQ</h2>
            <p class="text-neutral-500 text-xl mt-3">Häufig gestellte Fragen</p>
          </div>
          <div class="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8 p-4 bg-slate-100 rounded-2xl border-2 border-black">
            <div class="py-5">
              <details class="group">
                <summary class="flex justify-around items-center font-medium cursor-pointer list-none text-white bg-[#031124] rounded-3xl p-2">
                  <span>
                    {" "}
                    Wie oft sollte eine Wartung an einem BHKW durchgeführt
                    werden?{" "}
                  </span>
                  <span class="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p class="px-4 text-black mt-3 group-open:animate-fadeIn">
                  Die Wartung sollte je nach Betriebsstunden und
                  Herstellerempfehlungen durchgeführt werden. In der Regel sind
                  regelmäßige Wartungen alle 4.000 bis 8.000 Betriebsstunden
                  notwendig.{" "}
                </p>
              </details>
            </div>
            <div class="py-5">
              <details class="group">
                <summary class="flex justify-around items-center font-medium cursor-pointer list-none text-white bg-[#031124] rounded-3xl p-2">
                  <span>
                    {" "}
                    Welche Vorteile bietet ein BHKW-Service von SCANIA/MAN?{" "}
                  </span>
                  <span class="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p class="px-4 text-black mt-3 group-open:animate-fadeIn">
                  Unser Service für SCANIA- und MAN-Motoren gewährleistet die
                  maximale Effizienz und Lebensdauer Ihrer Anlage. Unsere
                  Experten sorgen dafür, dass Ihre Anlage reibungslos läuft und
                  hohe Verfügbarkeit bietet.{" "}
                </p>
              </details>
            </div>
            <div class="py-5">
              <details class="group">
                <summary class="flex justify-around items-center font-medium cursor-pointer list-none text-white bg-[#031124] rounded-3xl p-2">
                  <span>
                    {" "}
                    Kann ich den Service für mein BHKW online überwachen?{" "}
                  </span>
                  <span class="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p class="px-4 text-black mt-3 group-open:animate-fadeIn">
                  Ja, unser System sendet automatische Erinnerungen für
                  bevorstehende Wartungen und ermöglicht es Ihnen, den Zustand
                  und die Betriebsstunden Ihres Motors zu überwachen, um
                  sicherzustellen, dass er optimal läuft.{" "}
                </p>
              </details>
            </div>
            <div class="py-5">
              <details class="group">
                <summary class="flex justify-around items-center font-medium cursor-pointer list-none text-white bg-[#031124] rounded-3xl p-2">
                  <span>
                    {" "}
                    Wie kann ich die Rentabilität meiner BIO-Gasanlage
                    verbessern?{" "}
                  </span>
                  <span class="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p class="px-4 text-black mt-3 group-open:animate-fadeIn">
                  Durch regelmäßige Wartung und Anpassung der Anlage an die
                  besten Standards können Sie den Gasverbrauch optimieren und
                  gleichzeitig die Stromproduktion steigern. Unsere Techniker
                  unterstützen Sie dabei.{" "}
                </p>
              </details>
            </div>
          </div>
        </div>
      </VisibilitySensor>
    </Reveal>
  );
};

export default AboutQA;
