import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Chart, registerables } from "chart.js";
import loadNodesData from "./Data";

Chart.register(...registerables);

const getFormattedDateTime = () => {
  const now = new Date();
  return now.toLocaleString();
};

const generateChartImage = (type, data, options, width = 900, height = 450) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
      type,
      data,
      options: { ...options, responsive: false, animation: false },
    });

    setTimeout(() => {
      resolve(canvas.toDataURL("image/png"));
    }, 500);
  });
};

export const handleDownload = async () => {
  const { nodes: loadedNodes, pipes: loadedPipes } = await loadNodesData();
  const nodes = loadedNodes;
  const pipes = loadedPipes;
  const doc = new jsPDF("p", "pt", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(18);
  doc.text("Network Report", pageWidth / 2, 40, { align: "center" });
  doc.setFontSize(10);
  doc.text(`Generated on: ${getFormattedDateTime()}`, 40, 60);

  const categorized = {
    heater: [],
    sink: [],
    junction: [],
  };
  nodes.forEach((node) => {
    if (categorized[node.type]) categorized[node.type].push(node.temperature);
  });

  const colors = {
    heater: "rgba(255, 0, 0, 0.7)",
    sink: "rgba(0, 128, 255, 0.7)",
    junction: "rgba(0, 200, 100, 0.7)",
  };

  const minTemp = 50;
  const maxTemp = 120;
  const tempLabels = Array.from(
    { length: maxTemp - minTemp + 1 },
    (_, i) => minTemp + i
  );

  for (const type of ["heater", "sink", "junction"]) {
    const temps = categorized[type];
    const data = new Array(maxTemp - minTemp + 1).fill(0);

    temps.forEach((t) => {
      const rounded = Math.round(t);
      if (rounded >= minTemp && rounded <= maxTemp) {
        data[rounded - minTemp]++;
      }
    });

    const chartData = {
      labels: tempLabels,
      datasets: [
        {
          label: `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } Node Temperatures`,
          data,
          backgroundColor: colors[type],
        },
      ],
    };

    const chartImage = await generateChartImage("bar", chartData, {
      plugins: {
        title: {
          display: true,
          text: `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } Temperature Distribution`,
        },
      },
      scales: {
        x: {
          title: { display: true, text: "Temperature (°C)" },
        },
        y: {
          title: { display: true, text: "Frequency" },
          beginAtZero: true,
        },
      },
    });

    doc.addPage();
    doc.setFontSize(14);
    doc.text(
      `${type.charAt(0).toUpperCase() + type.slice(1)} Node Temperature`,
      40,
      40
    );
    doc.addImage(chartImage, "PNG", 40, 60, 500, 250);
  }

  // Pipe mass flow chart
  const pipeChartData = {
    labels: pipes.map((p) => p.pipeId),
    datasets: [
      {
        label: "Mass Flow",
        data: pipes.map((p) => p.massflow),
        backgroundColor: "rgba(153, 102, 255, 0.7)",
      },
    ],
  };

  const pipeChart = await generateChartImage("bar", pipeChartData, {
    plugins: { title: { display: true, text: "Mass Flow Rates in Pipes" } },
    scales: {
      x: { title: { display: true, text: "Pipe ID" } },
      y: { title: { display: true, text: "Mass Flow Rate" } },
    },
  });

  doc.addPage();
  doc.setFontSize(14);
  doc.text("Pipe Mass Flow Chart", 40, 40);
  doc.addImage(pipeChart, "PNG", 40, 60, 500, 250);

  // Node Table
  doc.addPage();
  doc.setFontSize(14);
  doc.text("Node Data", 40, 40);
  autoTable(doc, {
    head: [["ID", "Type", "Temperature", "X", "Y"]],
    body: nodes.map((n) => [
      n.nodeId,
      n.type,
      n.temperature.toFixed(2),
      n.x,
      n.y,
    ]),
    styles: { halign: "left" },
    headStyles: { fillColor: [0, 128, 255] },
    startY: 60,
  });

  // Pipe Table
  doc.addPage();
  doc.setFontSize(14);
  doc.text("Pipe Data", 40, 40);
  autoTable(doc, {
    head: [["Pipe ID", "From", "To", "Mass Flow"]],
    body: pipes.map((p) => [p.pipeId, p.from, p.to, p.massflow.toFixed(2)]),
    styles: { halign: "left" },
    headStyles: { fillColor: [100, 200, 100] },
    startY: 60,
  });

  doc.save(`Network_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
};
