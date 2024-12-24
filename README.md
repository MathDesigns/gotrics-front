# GoTrics Frontend

The **GoTrics Frontend** is a real-time dashboard that displays system metrics received from the **GoTrics Server**. It fetches the metrics from the server and updates the UI every 5 seconds. Built using **Svelte** and **Tailwind CSS**, it provides a sleek, modern interface for viewing metrics.

---

### Features

- **Real-time Data**: Displays metrics in real-time, fetching data from the backend every 5 seconds.
- **Responsive UI**: Built with Svelte and styled using Tailwind CSS, making it responsive and visually appealing.
- **Data Fetching**: Periodically fetches data from the server and updates the UI with the latest metrics.
- **No Authentication**: Simple and straightforward dashboard with no authentication layer.

---

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your_username/gotrics-front.git 
cd gotrics-front
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

This will start the frontend on `http://localhost:5173` by default.

---

### Usage

- On the frontend, the dashboard will display a list of nodes and their metrics (CPU and memory usage).
- The frontend makes a GET request to the GoTrics Server every 5 seconds to fetch the latest metrics and update the UI.

---

### License

This project is licensed under the MIT License.