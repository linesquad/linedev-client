import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { useGetBloggerPosts } from "../../hooks/useGetBlog";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const monthNames = [
  "იანვარი",
  "თებერვალი",
  "მარტი",
  "აპრილი",
  "მაისი",
  "ივნისი",
  "ივლისი",
  "აგვისტო",
  "სექტემბერი",
  "ოქტომბერი",
  "ნოემბერი",
  "დეკემბერი",
];

export default function MonthBlog() {
  const { data, isLoading, isError } = useGetBloggerPosts();
  console.log(data);
  if (isLoading)
    return <p className="text-center mt-10 text-lg">იტვირთება...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">შეცდომა დატვირთვისას.</p>
    );

  // თითო თვის ბლოგების რაოდენობა
  const blogCounts = new Array(12).fill(0);
  data.blogs.forEach((blog: { createdAt: string | number | Date }) => {
    const month = new Date(blog.createdAt).getMonth();
    blogCounts[month]++;
  });

  const chartData = {
    labels: monthNames,
    datasets: [
      {
        label: "ბლოგების რაოდენობა",
        data: blogCounts,
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        borderRadius: 8,
        barThickness: 30,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.raw} ბლოგი`,
        },
      },
      title: {
        display: true,
        text: "თვეების მიხედვით ბლოგების რაოდენობა",
        font: { size: 18 },
        color: "#ffff",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: { size: 12 },
          color: "#ffff",
        },
        grid: { color: "#ffff" }, // gray-200
      },
      x: {
        ticks: {
          font: { size: 12 },
          color: "#ffff",
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div className=" gap-[10px] ">
      <div className="max-w-6xl h-[400px] mx-auto mt-10 px-4  bg-[#1f1f2b]  rounded-xl shadow-lg p-6">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
