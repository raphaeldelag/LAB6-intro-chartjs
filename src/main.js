import './styles.css'

import { Chart } from 'chart.js/auto'
import { csvParse } from 'd3'

Chart.defaults.color = 'white'

async function loadAndChartData() {
  const response = await fetch('data/police_shootings_wide.csv')
  const csvText = await response.text()
  const data = csvParse(csvText)

  const ctx = document.getElementById('chart')
  new Chart(
    ctx,
    {
      type: 'line',
      data: {
        labels: data.map(d => d.Year),
        datasets: [
          {
            label: 'Fatal Police Shootings (US)',
            data: data.map(d => +d['Fatal police shootings (US)']),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239,68,68,0.1)',
            fill: false,
            tension: 0.3
          },
          {
            label: 'Fatal Police Shootings (Canada)',
            data: data.map(d => +d['Fatal police shootings (Canada)']),
            borderColor: '#7dd3fc',
            backgroundColor: 'rgba(125,211,252,0.1)',
            fill: false,
            tension: 0.3
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              font: { size: 16, weight: 'bold' }
            }
          }
        },
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Incidents',
              font: { size: 16, weight: 'bold' }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Year',
              font: { size: 16, weight: 'bold' }
            }
          }
        }
      }
    }
  )

  const crimeResponse = await fetch('data/dc_crime_2020.csv')
  const crimeCsvText = await crimeResponse.text()
  const crimeData = csvParse(crimeCsvText)

  const ctx2 = document.getElementById('chart2')
  new Chart(
    ctx2,
    {
      type: 'bar',
      data: {
        labels: crimeData.map(d => d.Offense),
        datasets: [
          {
            label: 'Incidents',
            data: crimeData.map(d => +d.Incidents),
            backgroundColor: 'rgba(125,211,252,0.7)',
            borderColor: '#7dd3fc',
            borderWidth: 1
          }
        ]
      },
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            labels: {
              font: { size: 16, weight: 'bold' }
            }
          }
        },
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Incidents',
              font: { size: 16, weight: 'bold' }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Offense Type',
              font: { size: 16, weight: 'bold' }
            }
          }
        }
      }
    }
  )
}

loadAndChartData()
