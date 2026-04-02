import { useEffect, useRef } from "react";
import * as d3 from "d3";

const DIMENSIONS = [
  { letter: "I", label: "Imprinted",          color: "#7B68A6" },
  { letter: "C", label: "Capturing",          color: "#4A7CC7" },
  { letter: "O", label: "Openly",             color: "#4A6644" },
  { letter: "N", label: "Never Lost",         color: "#C4956A" },
  { letter: "I", label: "Ingrained",          color: "#B86A54" },
  { letter: "C", label: "Chosen",             color: "#6A8FAF" },
];

const CX = 150;
const CY = 150;
const R = 115;

// Compute the 6 vertices of a flat-top hexagon (starting from top-right)
// We use pointy-top: vertex i at angle = -90 + 60*i degrees
function hexVertices(): [number, number][] {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (-90 + 60 * i);
    return [CX + R * Math.cos(angle), CY + R * Math.sin(angle)];
  });
}

// Each segment is a triangle: center + vertex[i] + vertex[(i+1)%6]
// The label sits at the centroid of that triangle
function segmentCentroid(i: number): [number, number] {
  const verts = hexVertices();
  const v0 = verts[i];
  const v1 = verts[(i + 1) % 6];
  return [(CX + v0[0] + v1[0]) / 3, (CY + v0[1] + v1[1]) / 3];
}

function trianglePath(i: number): string {
  const verts = hexVertices();
  const v0 = verts[i];
  const v1 = verts[(i + 1) % 6];
  return `M ${CX},${CY} L ${v0[0]},${v0[1]} L ${v1[0]},${v1[1]} Z`;
}

interface Props {
  activeSegments: number; // 0-6: how many segments are lit
}

export function IconicHexagon({ activeSegments }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    // Update each segment's fill and opacity
    DIMENSIONS.forEach((dim, i) => {
      const isActive = i < activeSegments;
      svg.select<SVGPathElement>(`#seg-${i}`)
        .transition()
        .duration(400)
        .ease(d3.easeCubicOut)
        .attr("fill", isActive ? dim.color : "none")
        .attr("stroke", dim.color)
        .attr("stroke-width", isActive ? 0 : 1.5)
        .attr("fill-opacity", isActive ? 0.85 : 0);

      svg.select<SVGTextElement>(`#label-${i}`)
        .transition()
        .duration(400)
        .ease(d3.easeCubicOut)
        .attr("fill-opacity", isActive ? 1 : 0.35);
    });
  }, [activeSegments]);

  const verts = hexVertices();

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 300 300"
      style={{ width: "100%", maxWidth: 320, height: "auto" }}
    >
      {/* Outer hexagon border */}
      <polygon
        points={verts.map(v => v.join(",")).join(" ")}
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={1}
      />

      {/* Segments */}
      {DIMENSIONS.map((dim, i) => {
        const isInitiallyActive = i < activeSegments;
        return (
          <path
            key={i}
            id={`seg-${i}`}
            d={trianglePath(i)}
            fill={isInitiallyActive ? dim.color : "none"}
            fillOpacity={isInitiallyActive ? 0.85 : 0}
            stroke={dim.color}
            strokeWidth={isInitiallyActive ? 0 : 1.5}
          />
        );
      })}

      {/* Center divider lines */}
      {verts.map((v, i) => (
        <line
          key={i}
          x1={CX}
          y1={CY}
          x2={v[0]}
          y2={v[1]}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
        />
      ))}

      {/* Dimension letters */}
      {DIMENSIONS.map((dim, i) => {
        const [cx, cy] = segmentCentroid(i);
        const isInitiallyActive = i < activeSegments;
        return (
          <text
            key={i}
            id={`label-${i}`}
            x={cx}
            y={cy + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="22"
            fontWeight="700"
            fontFamily="serif"
            fill="white"
            fillOpacity={isInitiallyActive ? 1 : 0.35}
          >
            {dim.letter}
          </text>
        );
      })}

      {/* Center dot */}
      <circle cx={CX} cy={CY} r={4} fill="rgba(255,255,255,0.3)" />
    </svg>
  );
}
