import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Table } from "primeng/table";
import { Subscription, debounceTime } from "rxjs";
import { LayoutService } from "../core/services/app.layout.service";
import { orderStatus } from "../core/services/cart.service";
import { DashboardService } from "../core/services/dashboard.service";
import { LoaderService } from "../core/services/loader.service";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {
  // message on top
  msgs1: any = [
    {
      severity: "custom",
      detail: `👋 Hello! Welcome to Freya! Before start please complete your profile to
  know you better.`,
    },
  ];
  //orders data for main chart
  orders: any = {
    monthlyData: {
      dateRange: "last 12 month",
      orders: [],
      // orderUnits: [145, 584, 676, 281, 137, 459, 136, 178, 435, 176, 456, 480],
      // AverageUnitByOrder: 1.2,
      // AverageSalesByOrder: "$28.00",
      totalSales: "$109,788.00",
    },
  };

  totalCustomer!: any;
  totalVendor!: any;
  totalProduct!: any;
  totalOrder!: any;
  totalSales!: any;

  //main chart data
  chartData: any;
  chartOptions: any;

  //clients chart Data
  chart1: any;
  chartOptions1: any;

  //pie data for sales
  pieData: any;
  pieOptions: any;

  // dropdown date ranges
  dateRanges: any[] = [{ name: "Monthly", code: "MONTH" }];
  selectedDate: any;

  // popup menu items for waiting actions
  items: MenuItem[] = [
    {
      icon: "pi pi-check",
      label: "Complete",
    },

    {
      icon: "pi pi-times",
      label: "Cancel",
    },
    {
      icon: "pi pi-external-link",
      label: "Details",
    },
  ];

  //expandable ads table data
  activeAds: any[] = [
    {
      image: "assets/demo/images/product/black-watch.jpg",
      name: "Experience Timeless Elegance with the Black-Watch",
      adDesc: `Upgrade your style with the Black-Watch. Its sleek and sophisticated design will elevate your wardrobe to new heights. With its precise timekeeping, you'll never miss an important appointment again. Invest in a piece that will last a lifetime. Get your Black-Watch today.`,
      adCTR: "6%",
      adROI: "10%",
      detailedData: [
        {
          name: "Mail",
          adROI: "10%",
          adCTR: "3%",
          adCR: "2%",
          impressions: 5000,
          clicks: 100,
          adCPA: "$50.00",
          adCPC: "$2.00",
        },
        {
          name: "Google Ads",
          adROI: "15%",
          adCTR: "6%",
          adCR: "4%",
          impressions: 10000,
          clicks: 400,
          adCPA: "$37.50",
          adCPC: "$1.50",
        },
        {
          name: "FB Ads",
          adROI: "20%",
          adCTR: "7%",
          adCR: "5%",
          impressions: 15000,
          clicks: 750,
          adCPA: "$31.25",
          adCPC: "$1.25",
        },
      ],
    },
    {
      image: "assets/demo/images/product/green-earbuds.jpg",
      name: "Eco-Friendly Sound with Green-Earbuds",
      adDesc: `Listen to your music while helping the environment with Green-Earbuds. Made with sustainable materials, these earbuds offer high-quality sound while reducing your carbon footprint. With a comfortable fit and long battery life, you can enjoy your music all day. Join the eco-movement and get your Green-Earbuds today.`,
      adCTR: "6%",
      adROI: "15%",
      detailedData: [
        {
          name: "Mail",
          adROI: "10%",
          adCTR: "3%",
          adCR: "2%",
          impressions: 5000,
          clicks: 100,
          adCPA: "$50.00",
          adCPC: "$2.00",
        },
        {
          name: "Google Ads",
          adROI: "15%",
          adCTR: "6%",
          adCR: "4%",
          impressions: 10000,
          clicks: 400,
          adCPA: "$37.50",
          adCPC: "$1.50",
        },
        {
          name: "FB Ads",
          adROI: "20%",
          adCTR: "7%",
          adCR: "5%",
          impressions: 15000,
          clicks: 750,
          adCPA: "$31.25",
          adCPC: "$1.25",
        },
      ],
    },
    {
      image: "assets/demo/images/product/yoga-set.jpg",
      name: "Find Your Zen with the Yoga-Set",
      adDesc: `Take your yoga practice to the next level with the Yoga-Set. This comprehensive kit includes everything you need to enhance your stretch and strength. Whether you're a beginner or an experienced practitioner, the non-slip mat, blocks, and strap will support you in your journey. Embrace a healthier, happier lifestyle with the Yoga-Set. Order now.`,
      adCTR: "6%",
      adROI: "10%",
      detailedData: [
        {
          name: "Mail",
          adROI: "10%",
          adCTR: "3%",
          adCR: "2%",
          impressions: 5000,
          clicks: 100,
          adCPA: "$50.00",
          adCPC: "$2.00",
        },
        {
          name: "Google Ads",
          adROI: "15%",
          adCTR: "6%",
          adCR: "4%",
          impressions: 10000,
          clicks: 400,
          adCPA: "$37.50",
          adCPC: "$1.50",
        },
        {
          name: "FB Ads",
          adROI: "20%",
          adCTR: "7%",
          adCR: "5%",
          impressions: 15000,
          clicks: 750,
          adCPA: "$31.25",
          adCPC: "$1.25",
        },
      ],
    },
    {
      image: "assets/demo/images/product/gold-phone-case.jpg",
      name: "Add a Touch of Luxury to Your Phone with the Gold Case",
      adDesc: `Make a statement with the Gold Phone Case. Its sleek and stylish design will turn heads and keep your phone protected. Crafted with premium materials, this case will not only protect your phone but also elevate your style. Don't settle for a boring case. Get the Gold Phone Case today.`,
      adCTR: "6%",
      adROI: "13%",
      detailedData: [
        {
          name: "Mail",
          adROI: "10%",
          adCTR: "3%",
          adCR: "2%",
          impressions: 5000,
          clicks: 100,
          adCPA: "$50.00",
          adCPC: "$2.00",
        },
        {
          name: "Google Ads",
          adROI: "15%",
          adCTR: "6%",
          adCR: "4%",
          impressions: 10000,
          clicks: 400,
          adCPA: "$37.50",
          adCPC: "$1.50",
        },
        {
          name: "FB Ads",
          adROI: "20%",
          adCTR: "7%",
          adCR: "5%",
          impressions: 15000,
          clicks: 750,
          adCPA: "$31.25",
          adCPC: "$1.25",
        },
      ],
    },
    {
      image: "assets/demo/images/product/bamboo-watch.jpg",
      name: "Eco-Friendly Timepiece: Experience Style with our Bamboo Watch",
      adDesc: `Stay on time and on trend with the Bamboo-Watch. Made with sustainable bamboo materials, this watch not only looks great but also helps protect the environment. With its precise timekeeping and versatile design, the Bamboo-Watch is perfect for any occasion. Get yours today and join the eco-movement in style.`,
      adCTR: "6%",
      adROI: "22%",
      detailedData: [
        {
          name: "Mail",
          adROI: "10%",
          adCTR: "3%",
          adCR: "2%",
          impressions: 5000,
          clicks: 100,
          adCPA: "$50.00",
          adCPC: "$2.00",
        },
        {
          name: "Google Ads",
          adROI: "15%",
          adCTR: "6%",
          adCR: "4%",
          impressions: 10000,
          clicks: 400,
          adCPA: "$37.50",
          adCPC: "$1.50",
        },
        {
          name: "FB Ads",
          adROI: "20%",
          adCTR: "7%",
          adCR: "5%",
          impressions: 15000,
          clicks: 750,
          adCPA: "$31.25",
          adCPC: "$1.25",
        },
      ],
    },
  ];

  //config subscription
  subscription: Subscription;

  orderStatusOptions: orderStatus[] = [
    "CANCELLED",
    "CHECK_OUT",
    "COMPLETED",
    "In_CART",
  ];
  orderStatus: orderStatus = "COMPLETED";
  constructor(
    private layoutService: LayoutService,
    private dashboardService: DashboardService,
    private loaderService: LoaderService
  ) {
    this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe((config) => {
        this.initChart();
      });
  }

  ngOnInit() {
    this.initChart();
    this.selectedDate = this.dateRanges[0];
    this.getAdminReport();
    this.dashboardService.getKpiAdminReport().subscribe((res: any) => {
      console.log(res);
      const data = res.data;
      this.totalCustomer = +data.find((el: any) => el.key === "Total Customer")
        ?.value;
      this.totalVendor = +data.find((el: any) => el.key === "Total Vendor")
        ?.value;
      this.totalProduct = +data.find((el: any) => el.key === "Total Product")
        ?.value;
      this.totalOrder = +data.find((el: any) => el.key === "Total Order")
        ?.value;
      this.totalSales = +data.find((el: any) => el.key === "Total Sales")
        ?.value;
      this.orders.monthlyData.totalSales = this.totalSales;
    });
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    //custom tooltip
    const getOrCreateTooltip = (chart: any) => {
      let tooltipEl = chart.canvas.parentNode.querySelector("div");

      if (!tooltipEl) {
        tooltipEl = document.createElement("div");
        tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
        tooltipEl.style.borderRadius = "12px";
        tooltipEl.style.color = "white";
        tooltipEl.style.opacity = 1;
        tooltipEl.style.pointerEvents = "none";
        tooltipEl.style.position = "absolute";
        tooltipEl.style.transform = "translate(-50%, 0)";
        tooltipEl.style.transition = "all .2s ease";

        const table = document.createElement("table");
        table.style.margin = "0px";

        tooltipEl.appendChild(table);
        chart.canvas.parentNode.appendChild(tooltipEl);
      }

      return tooltipEl;
    };
    const externalTooltipHandler = (context: any) => {
      // Tooltip Element
      const { chart, tooltip } = context;
      const tooltipEl = getOrCreateTooltip(chart);

      // Hide if no tooltip
      if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      // Set Text
      if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map((b: any) => b.lines);
        const tableHead = document.createElement("thead");

        // titleLines.forEach((title: any) => {
        //   const tr = document.createElement("tr");
        //   tr.style.borderWidth = "0";

        //   const th = document.createElement("th");
        //   th.style.borderWidth = "0";
        //   th.innerText = this.selectedDate.code == "DAY" ? "Day " : "";
        //   const text = document.createTextNode(title);

        //   th.appendChild(text);
        //   tr.appendChild(th);
        //   tableHead.appendChild(tr);
        // });

        const tableBody = document.createElement("tbody");
        bodyLines.forEach((body: any, i: any) => {
          const colors = tooltip.labelColors[i];

          const span = document.createElement("span");
          span.style.background = colors.backgroundColor;
          span.style.borderColor = colors.borderColor;
          span.style.borderWidth = "2px";
          span.style.marginRight = "10px";

          span.style.height = "10px";
          span.style.width = "10px";
          span.style.display = "inline-block";

          const tr = document.createElement("tr");
          tr.style.backgroundColor = "inherit";
          tr.style.borderWidth = "0";
          const td = document.createElement("td");
          td.style.borderWidth = "0";

          const text = document.createTextNode(body);

          td.appendChild(span);
          td.appendChild(text);
          tr.appendChild(td);
          tableBody.appendChild(tr);
        });

        const tableFooter = document.createElement("tfooter");
        const trFooter = document.createElement("tr");
        trFooter.style.backgroundColor = "inherit";
        trFooter.style.borderWidth = "0";
        // trFooter.innerHTML =
        //   `</br> <span> Average Unit/Order: </span>
        //       </br> <b>` +
        //   (this.selectedDate.code == "DAY"
        //     ? this.orders.dailyData.AverageUnitByOrder
        //     : this.selectedDate.code == "WEEK"
        //     ? this.orders.weeklyData.AverageUnitByOrder
        //     : this.orders.monthlyData.AverageUnitByOrder) +
        //   `</b></br></br> ` +
        //   `<span> Average Sales/Order: </span>
        //       </br> <b>` +
        //   (this.selectedDate.code == "DAY"
        //     ? this.orders.dailyData.AverageSalesByOrder
        //     : this.selectedDate.code == "WEEK"
        //     ? this.orders.weeklyData.AverageSalesByOrder
        //     : this.orders.monthlyData.AverageSalesByOrder) +
        //   `</b></br></br> ` +
        //   `<span> Total Sales: </span>
        //       </br> <b>` +
        //   (this.selectedDate.code == "DAY"
        //     ? this.orders.dailyData.totalSales
        //     : this.selectedDate.code == "WEEK"
        //     ? this.orders.weeklyData.totalSales
        //     : this.orders.monthlyData.totalSales) +
        //   `</b>`;
        tableFooter.appendChild(trFooter);

        const tableRoot = tooltipEl.querySelector("table");

        // Remove old children
        while (tableRoot.firstChild) {
          tableRoot.firstChild.remove();
        }

        // Add new children
        tableRoot.appendChild(tableHead);
        tableRoot.appendChild(tableBody);
        tableRoot.appendChild(tableFooter);
      }

      const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.left = positionX + tooltip.caretX + "px";
      tooltipEl.style.top = positionY + tooltip.caretY + "px";
      tooltipEl.style.font = tooltip.options.bodyFont.string;
      tooltipEl.style.padding =
        tooltip.options.padding + "px " + tooltip.options.padding + "px";
    };

    //main chart
    // this.chartData = {
    //   labels: [
    //     "01",
    //     "02",
    //     "03",
    //     "04",
    //     "05",
    //     "06",
    //     "07",
    //     "08",
    //     "09",
    //     "10",
    //     "11",
    //     "12",
    //     "13",
    //     "14",
    //     "15",
    //     "16",
    //     "17",
    //     "18",
    //     "19",
    //     "20",
    //     "21",
    //     "22",
    //     "23",
    //     "24",
    //     "25",
    //     "26",
    //     "27",
    //     "28",
    //     "29",
    //     "30",
    //   ],
    //   datasets: [
    //     {
    //       label: "Orders",
    //       data: this.orders.monthlyData.orders,
    //       fill: false,
    //       backgroundColor: documentStyle.getPropertyValue("--primary-color"),
    //       borderRadius: 6,
    //     },
    //   ],
    // };
    this.chartOptions = {
      animation: {
        duration: 0,
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          labels: {
            color: textColor,
            usePointStyle: true,
            boxHeight: 15,
            pointStyleWidth: 17,
            padding: 14,
          },
        },
        tooltip: {
          enabled: false,
          position: "nearest",
          external: externalTooltipHandler,
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    //clients chart
    this.chart1 = {
      labels: ["8Sun", "9Mon", "10Thu", "11Wed", "12Fri", "13Sat", "14Sun"],
      datasets: [
        {
          label: "New Clients",
          data: [12, 19, 15, 28, 32, 22, 39],
          borderColor: documentStyle.getPropertyValue("--primary-light-color"),
          borderWidth: 4,
          fill: true,
          backgroundColor: documentStyle.getPropertyValue(
            "--primary-lighter-color"
          ),
          tension: 0.4,
        },
      ],
    };
    this.chartOptions1 = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
            usePointStyle: true,
            boxHeight: 15,
            pointStyleWidth: 17,
            padding: 14,
          },
        },
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },

      maintainAspectRatio: false,
      hover: {
        mode: "index",
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
    };

    //sales by category pie chart
    this.pieData = {
      labels: ["Watches", "Clothing", "Gadgets", "Accessories"],
      datasets: [
        {
          data: [300, 50, 100, 80],
          backgroundColor: [
            documentStyle.getPropertyValue("--primary-300"),
            documentStyle.getPropertyValue("--orange-300"),
            documentStyle.getPropertyValue("--green-300"),
            documentStyle.getPropertyValue("--cyan-300"),
          ],
          borderColor: surfaceBorder,
        },
      ],
    };
    this.pieOptions = {
      animation: {
        duration: 0,
      },
      plugins: {
        legend: {
          display: false,
          labels: {
            display: false,
          },
          position: "bottom",
        },
      },
    };
  }

  getAdminReport() {
    this.loaderService.show();
    this.dashboardService
      .getAdminReport(this.orderStatus)
      .subscribe((res: any) => {
        console.log(res);
        this.loaderService.hide();
        this.orders.monthlyData.orders = Object.values(res?.data?.reportData);
        this.onDateChangeBarChart();
      });
  }

  onDateChangeBarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const monthlyData = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Sales Order Value",
          data: this.orders.monthlyData.orders,
          fill: false,
          backgroundColor: documentStyle.getPropertyValue("--primary-color"),
          borderRadius: 12,
        },
        // {
        //   label: "Units",
        //   data: this.orders.monthlyData.orderUnits,
        //   fill: false,
        //   backgroundColor: documentStyle.getPropertyValue(
        //     "--primary-light-color"
        //   ),
        // borderRadius: 12,
        // },
      ],
    };

    this.chartData = monthlyData;

    // const dailyData = {
    //   labels: [
    //     "01",
    //     "02",
    //     "03",
    //     "04",
    //     "05",
    //     "06",
    //     "07",
    //     "08",
    //     "09",
    //     "10",
    //     "11",
    //     "12",
    //     "13",
    //     "14",
    //     "15",
    //     "16",
    //     "17",
    //     "18",
    //     "19",
    //     "20",
    //     "21",
    //     "22",
    //     "23",
    //     "24",
    //     "25",
    //     "26",
    //     "27",
    //     "28",
    //     "29",
    //     "30",
    //   ],
    //   datasets: [
    //     {
    //       label: "Orders",
    //       data: this.orders.dailyData.orders,
    //       fill: false,
    //       backgroundColor: documentStyle.getPropertyValue("--primary-color"),
    //       borderRadius: 6,
    //     },
    //     {
    //       label: "Units",
    //       data: this.orders.dailyData.orderUnits,
    //       fill: false,
    //       backgroundColor: documentStyle.getPropertyValue(
    //         "--primary-light-color"
    //       ),
    //       borderRadius: 6,
    //     },
    //   ],
    // };

    // const weeklyData = {
    //   labels: [
    //     "Week 1",
    //     "Week 2",
    //     "Week 3",
    //     "Week 4",
    //     "Week 5",
    //     "Week 6",
    //     "Week 7",
    //     "Week 8",
    //     "Week 9",
    //     "Week 10",
    //     "Week 11",
    //     "Week 12",
    //     "Week 13",
    //     "Week 14",
    //     "Week 15",
    //     "Week 16",
    //     "Week 17",
    //     "Week 18",
    //     "Week 19",
    //     "Week 20",
    //     "Week 21",
    //     "Week 22",
    //     "Week 23",
    //     "Week 24",
    //   ],
    //   datasets: [
    //     {
    //       label: "Orders",
    //       data: this.orders.weeklyData.orders,
    //       fill: false,
    //       backgroundColor: documentStyle.getPropertyValue("--primary-color"),
    //       borderRadius: 6,
    //     },
    //     {
    //       label: "Units",
    //       data: this.orders.weeklyData.orderUnits,
    //       fill: false,
    //       backgroundColor: documentStyle.getPropertyValue(
    //         "--primary-light-color"
    //       ),
    //       borderRadius: 6,
    //     },
    //   ],
    // };

    let newBarData = { ...this.chartData };
    switch (this.selectedDate.name) {
      case "Monthly":
        newBarData = monthlyData;
        break;
      // case "Weekly":
      //   newBarData = weeklyData;
      //   break;
      // case "Daily":
      //   newBarData = dailyData;
      //   break;
      default:
        break;
    }

    this.chartData = newBarData;
  }

  //sum function for main chart data
  sumOf(array: any[]) {
    let sum: number = 0;
    array.forEach((a) => (sum += a));
    return sum;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
