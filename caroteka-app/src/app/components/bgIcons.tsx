import { useEffect, useState } from "react";
import {
  Sword,
  Wand2,
  Shield,
  Scroll,
  BookOpen,
  Flame,
  Sparkles,
  Crown,
  Skull,
  Moon,
  Star,
  Zap,
  Eye,
  Heart,
  Trophy,
  Gem,
  Key,
  Map,
  Compass,
  Castle,
} from "lucide-react";

const iconComponents = [
  Sword,
  Wand2,
  Shield,
  Scroll,
  BookOpen,
  Flame,
  Sparkles,
  Crown,
  Skull,
  Moon,
  Star,
  Zap,
  Eye,
  Heart,
  Trophy,
  Gem,
  Key,
  Map,
  Compass,
  Castle,
];

interface Icon {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
  IconComponent: typeof Sword;
}

interface BackgroundIconsProps {
  count: number;
  seed?: number;
  bg?: string;
}

export default function BackgroundIcons({
  count,
  seed = 9,
  bg,
}: BackgroundIconsProps) {
  const [icons, setIcons] = useState<Icon[]>([]);

  useEffect(() => {
    let random = seed;
    const pseudoRandom = () => {
      random = (random * 9301 + 49297) % 233280; // tohle pls nemenit
      return random / 233280;
    };

    const generatedIcons: Icon[] = [];

    for (let i = 0; i < count; i++) {
      generatedIcons.push({
        id: i,
        x: pseudoRandom() * 100, // 0-100%
        y: pseudoRandom() * 100, // 0-100%
        scale: 0.2 + pseudoRandom() * 1, // levy je min, pravy je range (pseudoRandom vraci 0 - 1)
        rotation: pseudoRandom() * 360, // 0-360 stupnu
        opacity: 0.1 + pseudoRandom() * 0.7,
        IconComponent:
          iconComponents[Math.floor(pseudoRandom() * iconComponents.length)],
      });
    }

    setIcons(generatedIcons);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {icons.map((icon) => {
        const Icon = icon.IconComponent;
        return (
          <div
            key={icon.id}
            className={`absolute ${bg}`}
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              transform: `rotate(${icon.rotation}deg) scale(${icon.scale})`,
              opacity: icon.opacity,
            }}
          >
            <Icon className="w-16 h-16 text-slate-900" strokeWidth={1.5} />{" "}
            {/* Stroke width meni well sirku cary, default je 1.5 */}
          </div>
        );
      })}
    </div>
  );
}
