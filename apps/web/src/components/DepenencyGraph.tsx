import React, { useEffect, useRef } from "react";

import type { ChartConfiguration } from "chart.js";
import "chartjs-plugin-datalabels";

import { Chart, registerables } from "chart.js";
import { DendogramController, EdgeLine } from "chartjs-chart-graph";
import { finished } from "stream";

Chart.register(DendogramController, EdgeLine, ...registerables);

export function convertToTree(dependencyArray: number[][]) {
  // console.log("dependecyArray: " + dependencyArray);
  const data = dependencyArray.map((d, i) => {
    return { label: "Step " + i, id: i };
  });

  const edges: {
    source: number;
    target: number;
  }[] = [];

  for (let i = 0; i < dependencyArray.length; i++) {
    for (let j = 0; j < dependencyArray[i].length; j++) {
      const source = i;
      const target = dependencyArray[i][j];

      if (source === target) {
        continue;
      }

      if (edges.find((d) => d.source === source && d.target === target)) {
        continue;
      }

      edges.push({ source: source, target: target });
    }
  }

  return {
    nodes: data,
    edges: edges,
  };
}

export default function DepenencyGraph({
  currentStep,
  tree,
  finishedSteps,
}: {
  currentStep: number;
  tree: {
    nodes: { label: string; id: number }[];
    edges: { source: number; target: number }[];
  };
  finishedSteps: number[];
}) {
  const chartRef = useRef<any>(null);

  const canvasRef = React.useRef<any>(undefined);

  const data: ChartConfiguration<"dendogram">["data"] = {
    labels: tree.nodes.map((d) => d.label),

    datasets: [
      {
        pointRadius: 5,
        data: tree.nodes,
        edges: tree.edges,
      } as any,
    ],
  };

  useEffect(() => {
    chartRef.current = new Chart(canvasRef.current, {
      type: "dendrogram",
      options: {
        tree: {
          orientation: "vertical",
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const label = context.dataset.data[context.dataIndex].label;
                return label;
              },
            },
          },
        },
      },
      data: data,
    } as any);

    return () => {
      chartRef.current.destroy();
    };
  }, []);

  const colorArray = tree.nodes.map((d, i) => {
    if (i === currentStep) {
      return "red";
    }
    if (finishedSteps.includes(i)) {
      return "green";
    }
    return "grey";
  });

  if (chartRef.current) {
    chartRef.current.data.datasets[0].pointBackgroundColor = colorArray;
    chartRef.current.update();
  }

  return <canvas ref={canvasRef} style={{ width: "100%" }} />;
}
