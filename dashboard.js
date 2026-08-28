    const dashDrawer = document.getElementById('dash-drawer');

    function openDrawer() {
      dashDrawer.classList.add('is-open');
    }

    function closeDrawer() {
      dashDrawer.classList.remove('is-open');
    }

    function closeDrawerInstant() {
      // Hide the drawer immediately (no slide-out transition) so it can't
      // be seen behind a popup that is opening on top of it.
      dashDrawer.style.transition = 'none';
      dashDrawer.classList.remove('is-open');
      dashDrawer.offsetHeight; // force reflow to apply the transition:none
      dashDrawer.style.transition = '';
    }

    document.querySelector('.m-dash-menu-btn')?.addEventListener('click', openDrawer);
    document.getElementById('dash-drawer-close')?.addEventListener('click', closeDrawer);

    const drawerGroups = document.querySelectorAll('.m-drawer-group');
    drawerGroups.forEach((group) => {
      const trigger = group.querySelector('.m-drawer-nav__item');
      trigger.addEventListener('click', () => {
        const willExpand = !group.classList.contains('is-expanded');
        drawerGroups.forEach((g) => g.classList.remove('is-expanded'));
        if (willExpand) {
          group.classList.add('is-expanded');
        }
      });
    });

    const reportSheet = document.getElementById('report-sheet');

    function openReportSheet() {
      reportSheet.classList.add('is-open');
    }

    function closeReportSheet() {
      reportSheet.classList.remove('is-open');
    }

    document.getElementById('sub-operation')?.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawerInstant();
      openReportSheet();
    });

    document.getElementById('report-sheet-back')?.addEventListener('click', () => {
      closeReportSheet();
      openDrawer();
    });

    const transactionSheet = document.getElementById('transaction-sheet');

    function openTransactionSheet() {
      transactionSheet.classList.add('is-open');
    }

    function closeTransactionSheet() {
      transactionSheet.classList.remove('is-open');
    }

    document.getElementById('sub-transaction')?.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawerInstant();
      openTransactionSheet();
    });

    document.getElementById('transaction-sheet-back')?.addEventListener('click', () => {
      closeTransactionSheet();
      openDrawer();
    });

    const brandSheet = document.getElementById('brand-sheet');
    const brandSheetBackdrop = document.getElementById('brand-sheet-backdrop');

    function openBrandSheet() {
      brandSheet.classList.add('is-open');
      brandSheetBackdrop.classList.add('is-open');
    }

    function closeBrandSheet() {
      brandSheet.classList.remove('is-open');
      brandSheetBackdrop.classList.remove('is-open');
    }

    document.getElementById('store-select-oiso')?.addEventListener('click', (e) => {
      e.preventDefault();
      openBrandSheet();
    });

    document.getElementById('brand-sheet-back')?.addEventListener('click', () => {
      closeBrandSheet();
    });

    brandSheetBackdrop?.addEventListener('click', () => {
      closeBrandSheet();
    });

    document.getElementById('brand-sheet-oiso')?.addEventListener('click', (e) => {
      e.preventDefault();
      closeBrandSheet();
    });

    document.getElementById('brand-sheet-mimi')?.addEventListener('click', (e) => {
      e.preventDefault();
      closeBrandSheet();
    });

    const storeSheet = document.getElementById('store-sheet');
    const storeSheetBackdrop = document.getElementById('store-sheet-backdrop');
    const storeFilterLabel = document.getElementById('store-filter-label');
    const drawerStoreLabel = document.getElementById('drawer-store-label');
    const storeItems = document.querySelectorAll('.m-store-item');

    function openStoreSheet() {
      storeSheet.classList.add('is-open');
      storeSheetBackdrop.classList.add('is-open');
    }

    function closeStoreSheet() {
      storeSheet.classList.remove('is-open');
      storeSheetBackdrop.classList.remove('is-open');
    }

    document.getElementById('store-filter-btn')?.addEventListener('click', () => {
      openStoreSheet();
    });

    document.getElementById('drawer-store-select')?.addEventListener('click', () => {
      openStoreSheet();
    });

    document.getElementById('store-sheet-back')?.addEventListener('click', () => {
      closeStoreSheet();
    });

    storeSheetBackdrop?.addEventListener('click', () => {
      closeStoreSheet();
    });

    storeItems.forEach((item) => {
      item.addEventListener('click', () => {
        storeItems.forEach((i) => i.classList.remove('is-active'));
        item.classList.add('is-active');
        if (storeFilterLabel) {
          storeFilterLabel.textContent = item.dataset.store;
        }
        if (drawerStoreLabel) {
          drawerStoreLabel.textContent = item.dataset.store;
        }
        closeStoreSheet();
      });
    });

    const KPI_DATA = {
      hourly: {
        sales: { label: 'Hourly Sales', value: 'RM 1,250.50', delta: '&#8599; RM61.00 +30%', deltaUp: true },
        profit: { label: 'Hourly Profit', value: 'RM 2,610.00', delta: '&#8599; RM61.00 +30%', deltaUp: true },
        transaction: { label: 'Hourly Transaction', value: '286', delta: 'Receipts' },
        avg: { label: 'Average Transactions', value: 'RM 31.26', delta: '' },
        refund: { label: 'Hourly Refund', value: 'RM 96.50', delta: 'RM0.00 0%' },
        void: { label: 'Hourly Void', value: 'RM 180.00', delta: '&#8599; RM0.00 +30%' },
      },
      daily: {
        sales: { label: 'Daily Sales', value: 'RM 8,940.20', delta: '&#8599; RM61.00 +30%', deltaUp: true },
        profit: { label: 'Daily Profit', value: 'RM 2,610.00', delta: '&#8599; RM61.00 +30%', deltaUp: true },
        transaction: { label: 'Daily Transaction', value: '286', delta: 'Receipts' },
        avg: { label: 'Average Transactions', value: 'RM 31.26', delta: '' },
        refund: { label: 'Daily Refund', value: 'RM 96.50', delta: 'RM0.00 0%' },
        void: { label: 'Daily Void', value: 'RM 180.00', delta: '&#8599; RM0.00 +30%' },
      },
      mtd: {
        sales: { label: 'MTD Sales', value: 'RM 38,240.00', delta: '&#8599; RM61.00 +30%', deltaUp: true },
        profit: { label: 'MTD Profit', value: 'RM 11,930.00', delta: '&#8599; RM61.00 +30%', deltaUp: true },
        transaction: { label: 'MTD Transaction', value: '1,204', delta: 'Receipts' },
        avg: { label: 'Average Transactions', value: 'RM 31.76', delta: '' },
        refund: { label: 'MTD Refund', value: 'RM 412.00', delta: 'RM0.00 0%' },
        void: { label: 'MTD Void', value: 'RM 760.00', delta: '&#8599; RM0.00 +30%' },
      },
      ytd: {
        sales: { label: 'YTD Sales', value: 'RM 1,250.50', delta: '&#8599; RM61.00 +30%', deltaUp: true },
        profit: { label: 'YTD Profit', value: 'RM 413.00', delta: '&#8599; RM61.00 +30%', deltaUp: true },
        transaction: { label: 'YTD Transaction', value: '42', delta: 'Receipts' },
        avg: { label: 'Average Transactions', value: 'RM 28.10', delta: '' },
        refund: { label: 'YTD Refund', value: 'RM 15.00', delta: 'RM0.00 0%' },
        void: { label: 'YTD Void', value: 'RM 42.00', delta: '&#8599; RM0.00 +30%' },
      },
    };

    const dashTabs = document.querySelectorAll('.m-dash-tab');
    const dashKpis = document.querySelectorAll('.m-dash-kpi');

    function applyKpiPeriod(period) {
      const data = KPI_DATA[period];
      if (!data) return;
      dashKpis.forEach((kpi) => {
        const key = kpi.dataset.kpi;
        const entry = data[key];
        if (!entry) return;
        const labelEl = kpi.querySelector('.m-dash-kpi__label');
        const valueEl = kpi.querySelector('.m-dash-kpi__value');
        const deltaEl = kpi.querySelector('.m-dash-kpi__delta');
        if (labelEl) labelEl.textContent = entry.label;
        if (valueEl) valueEl.textContent = entry.value;
        if (deltaEl) {
          deltaEl.innerHTML = entry.delta || '';
          deltaEl.classList.toggle('m-dash-kpi__delta--up', !!entry.deltaUp);
        }
      });
    }

    dashTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        setDashboardPeriod(tab.dataset.period);
      });
    });

    const kpiInfoBtns = document.querySelectorAll('.m-kpi-info');

    kpiInfoBtns.forEach((btn) => {
      const tip = document.createElement('span');
      tip.className = 'm-kpi-info__tooltip';
      tip.textContent = btn.dataset.tooltip || '';
      btn.appendChild(tip);

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasOpen = btn.classList.contains('is-open');
        kpiInfoBtns.forEach((b) => b.classList.remove('is-open'));
        if (!wasOpen) {
          btn.classList.add('is-open');
        }
      });
    });

    document.addEventListener('click', () => {
      kpiInfoBtns.forEach((b) => b.classList.remove('is-open'));
    });

    const dashKpisRow = document.getElementById('dash-kpis');
    const dashKpisDots = document.getElementById('dash-kpis-dots');
    let scrollToKpiIndex = () => {};
    let refreshKpiDots = () => {};

    if (dashKpisRow && dashKpisDots) {
      const kpiCards = Array.from(dashKpisRow.querySelectorAll('.m-dash-kpi'));

      scrollToKpiIndex = function (index) {
        dashKpisRow.scrollTo({ left: cardTarget(index), behavior: 'smooth' });
      };

      function cardTarget(index) {
        const maxScroll = dashKpisRow.scrollWidth - dashKpisRow.clientWidth;
        if (index === kpiCards.length - 1) {
          return maxScroll;
        }
        const card = kpiCards[index];
        const target = card.getBoundingClientRect().left - dashKpisRow.getBoundingClientRect().left + dashKpisRow.scrollLeft;
        return Math.min(target, maxScroll);
      }

      kpiCards.forEach((card, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'm-dash-kpis-dots__dot';
        dot.setAttribute('aria-label', `Go to card ${i + 1}`);
        dot.addEventListener('click', () => {
          dashKpisRow.scrollTo({ left: cardTarget(i), behavior: 'smooth' });
        });
        dashKpisDots.appendChild(dot);
      });

      const dotEls = Array.from(dashKpisDots.querySelectorAll('.m-dash-kpis-dots__dot'));

      function updateActiveDot() {
        const rowLeft = dashKpisRow.scrollLeft;
        const maxScroll = dashKpisRow.scrollWidth - dashKpisRow.clientWidth;
        if (rowLeft >= maxScroll - 2) {
          dotEls.forEach((dot, i) => dot.classList.toggle('is-active', i === kpiCards.length - 1));
          return;
        }
        let closestIndex = 0;
        let closestDist = Infinity;
        kpiCards.forEach((card, i) => {
          const cardLeft = card.getBoundingClientRect().left - dashKpisRow.getBoundingClientRect().left + rowLeft;
          const dist = Math.abs(cardLeft - rowLeft);
          if (dist < closestDist) {
            closestDist = dist;
            closestIndex = i;
          }
        });
        dotEls.forEach((dot, i) => dot.classList.toggle('is-active', i === closestIndex));
      }

      dashKpisRow.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateActiveDot);
      });
      refreshKpiDots = updateActiveDot;
      // Defer the initial measurement a frame so layout/widths are settled
      // (otherwise scrollWidth/clientWidth can read as 0 and wrongly mark the last dot active).
      window.requestAnimationFrame(() => window.requestAnimationFrame(updateActiveDot));
    }

    const filterSheet = document.getElementById('filter-sheet');
    const filterSheetBackdrop = document.getElementById('filter-sheet-backdrop');

    function openFilterSheet() {
      filterSheet.classList.add('is-open');
      filterSheetBackdrop.classList.add('is-open');
    }

    function closeFilterSheet() {
      filterSheet.classList.remove('is-open');
      filterSheetBackdrop.classList.remove('is-open');
    }

    document.getElementById('dash-filter-btn')?.addEventListener('click', () => {
      openFilterSheet();
    });

    document.getElementById('filter-sheet-close')?.addEventListener('click', () => {
      closeFilterSheet();
    });

    filterSheetBackdrop?.addEventListener('click', () => {
      closeFilterSheet();
    });

    const notifSheet = document.getElementById('notif-sheet');

    function openNotifSheet() {
      notifSheet.classList.add('is-open');
    }

    function closeNotifSheet() {
      notifSheet.classList.remove('is-open');
    }

    document.getElementById('notif-btn')?.addEventListener('click', openNotifSheet);
    document.getElementById('notif-sheet-close')?.addEventListener('click', closeNotifSheet);

    function setNotifItemRead(item, isUnread) {
      item.classList.toggle('m-notif-item--unread', isUnread);
      const icon = item.querySelector('.m-notif-item__icon-img');
      if (icon) icon.src = isUnread ? 'assets/notif-unread.svg' : 'assets/notif-read.svg';
    }

    notifSheet?.querySelectorAll('.m-notif-item').forEach((item) => {
      item.addEventListener('click', () => {
        setNotifItemRead(item, !item.classList.contains('m-notif-item--unread'));
      });
    });

    notifSheet?.querySelector('.m-notif-sheet__readall')?.addEventListener('click', () => {
      notifSheet.querySelectorAll('.m-notif-item').forEach((item) => setNotifItemRead(item, false));
    });

    /* ---------- Date range picker ---------- */
    (function () {
      const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const dateBtn = document.getElementById('date-range-btn');
      const dateLabel = document.getElementById('date-range-label');
      const sheet = document.getElementById('date-sheet');
      const backdrop = document.getElementById('date-sheet-backdrop');
      const monthLabel = document.getElementById('date-sheet-month');
      const grid = document.getElementById('date-sheet-grid');
      const rangeLabel = document.getElementById('date-sheet-range');
      const presets = document.querySelectorAll('.m-datesheet__preset');

      if (!dateBtn || !sheet) return;

      let viewYear = 2026;
      let viewMonth = 0; // 0 = January
      let rangeStart = new Date(2026, 0, 1);
      let rangeEnd = new Date(2026, 0, 31);

      function fmt(d) {
        const day = String(d.getDate()).padStart(2, '0');
        const mon = MONTH_NAMES[d.getMonth()].slice(0, 3);
        return `${day} ${mon} ${d.getFullYear()}`;
      }

      function fmtShort(d) {
        const day = String(d.getDate()).padStart(2, '0');
        const mon = String(d.getMonth() + 1).padStart(2, '0');
        return `${day}-${mon}-${d.getFullYear()}`;
      }

      function sameDay(a, b) {
        return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
      }

      function renderCalendar() {
        monthLabel.textContent = `${MONTH_NAMES[viewMonth]} ${viewYear}`;
        grid.innerHTML = '';

        const firstDay = new Date(viewYear, viewMonth, 1).getDay();
        const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
          const blank = document.createElement('button');
          blank.type = 'button';
          blank.className = 'm-datesheet__day';
          blank.disabled = true;
          grid.appendChild(blank);
        }

        for (let d = 1; d <= daysInMonth; d++) {
          const cellDate = new Date(viewYear, viewMonth, d);
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'm-datesheet__day';

          const inRange = rangeStart && rangeEnd && cellDate >= rangeStart && cellDate <= rangeEnd;
          const isStart = rangeStart && sameDay(cellDate, rangeStart);
          const isEnd = rangeEnd && sameDay(cellDate, rangeEnd);

          if (inRange) btn.classList.add('is-in-range');
          if (isStart) btn.classList.add('is-range-start');
          if (isEnd) btn.classList.add('is-range-end');

          const span = document.createElement('span');
          span.textContent = String(d);
          btn.appendChild(span);

          btn.addEventListener('click', () => {
            if (!rangeStart || (rangeStart && rangeEnd)) {
              rangeStart = cellDate;
              rangeEnd = null;
            } else if (cellDate < rangeStart) {
              rangeEnd = rangeStart;
              rangeStart = cellDate;
            } else {
              rangeEnd = cellDate;
            }
            presets.forEach((p) => p.classList.remove('m-datesheet__preset--active'));
            updateRangeLabel();
            renderCalendar();
          });

          grid.appendChild(btn);
        }
      }

      function updateRangeLabel() {
        if (rangeStart && rangeEnd) {
          rangeLabel.textContent = `${fmt(rangeStart)} – ${fmt(rangeEnd)}`;
        } else if (rangeStart) {
          rangeLabel.textContent = fmt(rangeStart);
        } else {
          rangeLabel.textContent = 'Select a date range';
        }
      }

      function goToMonth(date) {
        viewYear = date.getFullYear();
        viewMonth = date.getMonth();
      }

      function openDateSheet() {
        sheet.classList.add('is-open');
        backdrop.classList.add('is-open');
        renderCalendar();
        updateRangeLabel();
      }

      function closeDateSheet() {
        sheet.classList.remove('is-open');
        backdrop.classList.remove('is-open');
      }

      dateBtn.addEventListener('click', openDateSheet);
      backdrop.addEventListener('click', closeDateSheet);
      document.getElementById('date-sheet-close')?.addEventListener('click', closeDateSheet);

      document.getElementById('date-sheet-prev')?.addEventListener('click', () => {
        viewMonth -= 1;
        if (viewMonth < 0) { viewMonth = 11; viewYear -= 1; }
        renderCalendar();
      });

      document.getElementById('date-sheet-next')?.addEventListener('click', () => {
        viewMonth += 1;
        if (viewMonth > 11) { viewMonth = 0; viewYear += 1; }
        renderCalendar();
      });

      presets.forEach((preset) => {
        preset.addEventListener('click', () => {
          presets.forEach((p) => p.classList.remove('m-datesheet__preset--active'));
          preset.classList.add('m-datesheet__preset--active');

          const today = new Date(2026, 6, 15); // fixed "today" reference for this prototype
          const startOfWeek = (d) => {
            const s = new Date(d);
            s.setDate(s.getDate() - s.getDay());
            return s;
          };

          switch (preset.dataset.preset) {
            case 'today':
              rangeStart = today; rangeEnd = today; break;
            case 'yesterday': {
              const y = new Date(today); y.setDate(y.getDate() - 1);
              rangeStart = y; rangeEnd = y; break;
            }
            case 'this-week':
              rangeStart = startOfWeek(today); rangeEnd = today; break;
            case 'last-week': {
              const end = new Date(startOfWeek(today)); end.setDate(end.getDate() - 1);
              const start = startOfWeek(end);
              rangeStart = start; rangeEnd = end; break;
            }
            case 'this-month':
              rangeStart = new Date(today.getFullYear(), today.getMonth(), 1);
              rangeEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0); break;
            case 'last-month':
              rangeStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
              rangeEnd = new Date(today.getFullYear(), today.getMonth(), 0); break;
            case 'this-year':
              rangeStart = new Date(today.getFullYear(), 0, 1);
              rangeEnd = new Date(today.getFullYear(), 11, 31); break;
            case 'last-year':
              rangeStart = new Date(today.getFullYear() - 1, 0, 1);
              rangeEnd = new Date(today.getFullYear() - 1, 11, 31); break;
          }

          goToMonth(rangeStart);
          updateRangeLabel();
          renderCalendar();
        });
      });

      document.getElementById('date-sheet-apply')?.addEventListener('click', () => {
        if (rangeStart && rangeEnd) {
          dateLabel.textContent = `${fmtShort(rangeStart)} To ${fmtShort(rangeEnd)}`;
        }
        closeDateSheet();
      });
    })();

    /* ---------- Sales chart (dependency-free SVG, works fully offline) ---------- */
    const SALES_CHART_DATA = {
      hourly: {
        title: 'Hourly Sales',
        labels: ['12am', '2am', '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'],
        values: [80, 50, 10, 90, 350, 580, 980, 920, 420, 600, 500, 300],
        axisMax: 1000,
        axisStep: 200,
        axisLabel: 'Sales (RM)',
        xLabel: 'Month',
      },
      daily: {
        title: 'Daily Sales',
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        values: [700, 300, 800, 1200, 1800, 2500, 800],
        axisMax: 2500,
        axisStep: 500,
        axisLabel: 'Sales (RM)',
        xLabel: 'Month',
      },
      mtd: {
        title: 'Month To Date Sales',
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        values: [200, 508, 1000, 600],
        axisMax: 1000,
        axisStep: 200,
        axisLabel: 'Sales (RM)',
        xLabel: 'Month',
      },
      ytd: {
        title: 'Year To Date Sales',
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        values: [200, 300, 500, 800, 700, 500, 1000, 800, 500, 300, 800, 900],
        axisMax: 1000,
        axisStep: 200,
        axisLabel: 'Sales (RM)',
        xLabel: 'Month',
      },
    };

    // Sample multipliers used to derive Profit/Transaction/Avg/Refund/Void series
    // from the Sales series for the same period, so every metric has its own
    // title, values and axis scale in the chart.
    const CHART_METRICS = {
      sales: { titleWord: 'Sales', axisLabel: 'Sales (RM)', factor: 1, valuePrefix: 'RM', decimals: true },
      profit: { titleWord: 'Profit', axisLabel: 'Profit (RM)', factor: 0.29, valuePrefix: 'RM', decimals: true },
      transaction: { titleWord: 'Transaction', axisLabel: 'Transactions', factor: 0.03, valuePrefix: '', decimals: false },
      avg: { titleWord: 'Average Transactions', axisLabel: 'Avg (RM)', factor: 0.035, valuePrefix: 'RM', decimals: true, exactTitle: true },
      refund: { titleWord: 'Refund', axisLabel: 'Refund (RM)', factor: 0.11, valuePrefix: 'RM', decimals: true },
      void: { titleWord: 'Void', axisLabel: 'Void (RM)', factor: 0.19, valuePrefix: 'RM', decimals: true },
    };
    const CHART_METRIC_ORDER = ['sales', 'profit', 'transaction', 'avg', 'refund', 'void'];
    const CHART_METRIC_ICONS = {
      sales: 'assets/grosssales.svg',
      profit: 'assets/profit.svg',
      transaction: 'assets/transaction.svg',
      avg: 'assets/amount.svg',
      refund: 'assets/refund.svg',
      void: 'assets/void.svg',
    };

    function niceStep(raw) {
      if (raw <= 0) return 1;
      const exp = Math.floor(Math.log10(raw));
      const base = Math.pow(10, exp);
      const norm = raw / base;
      const niceNorm = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
      return niceNorm * base;
    }

    function getChartData(period, metricKey) {
      const base = SALES_CHART_DATA[period];
      if (!base) return null;
      if (metricKey === 'sales' || !CHART_METRICS[metricKey]) return base;

      const meta = CHART_METRICS[metricKey];
      const values = base.values.map((v) => Math.max(1, Math.round(v * meta.factor)));
      const step = niceStep((Math.max(...values) * 1.2) / 5);
      const axisMax = step * 5;
      const periodWord = base.title.replace(/\s*Sales$/, '');
      const title = meta.exactTitle ? meta.titleWord : `${periodWord} ${meta.titleWord}`.trim();

      return {
        title,
        labels: base.labels,
        values,
        axisMax,
        axisStep: step,
        axisLabel: meta.axisLabel,
        xLabel: base.xLabel,
        valuePrefix: meta.valuePrefix,
        decimals: meta.decimals,
      };
    }

    let currentPeriod = 'hourly';
    let currentMetric = 'sales';

    function renderSalesChart(period, metricKey) {
      const el = document.getElementById('chartSales');
      const titleEl = document.getElementById('sales-chart-title');
      const iconEl = document.getElementById('sales-chart-icon');
      if (!el) return;
      const metric = metricKey || 'sales';
      const data = getChartData(period, metric);
      if (!data) return;
      currentPeriod = period;
      currentMetric = metric;

      if (titleEl) titleEl.textContent = data.title;
      if (iconEl) iconEl.src = CHART_METRIC_ICONS[metric] || CHART_METRIC_ICONS.sales;

      const { labels: xLabelsArr, values, axisMax, axisStep, axisLabel, xLabel } = data;
      const valuePrefix = data.valuePrefix ?? 'RM';
      const decimals = data.decimals !== false;

      const W = 900;
      const H = 280;
      const padLeft = 62;
      const padRight = 14;
      const padTop = 54;
      const padBottom = 34;
      const plotW = W - padLeft - padRight;
      const plotH = H - padTop - padBottom;

      function xAt(i) {
        return padLeft + (i / (xLabelsArr.length - 1)) * plotW;
      }
      function yAt(v) {
        return padTop + plotH - (v / axisMax) * plotH;
      }

      const points = values.map((v, i) => [xAt(i), yAt(v)]);

      // Smooth path through points (Catmull-Rom -> cubic Bezier)
      function smoothPath(pts) {
        if (pts.length < 2) return '';
        let d = `M ${pts[0][0]} ${pts[0][1]}`;
        for (let i = 0; i < pts.length - 1; i++) {
          const p0 = pts[i - 1] || pts[i];
          const p1 = pts[i];
          const p2 = pts[i + 1];
          const p3 = pts[i + 2] || p2;
          const c1x = p1[0] + (p2[0] - p0[0]) / 6;
          const c1y = p1[1] + (p2[1] - p0[1]) / 6;
          const c2x = p2[0] - (p3[0] - p1[0]) / 6;
          const c2y = p2[1] - (p3[1] - p1[1]) / 6;
          d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
        }
        return d;
      }

      const linePath = smoothPath(points);
      const baseline = yAt(0);
      const areaPath = `${linePath} L ${points[points.length - 1][0]} ${baseline} L ${points[0][0]} ${baseline} Z`;

      const gridSteps = [];
      for (let v = 0; v <= axisMax; v += axisStep) gridSteps.push(Math.round(v));
      const gridLines = gridSteps.map((v) => {
        const y = yAt(v);
        const label = v === 0 ? '0' : decimals ? `${v}.00` : `${v}`;
        return `
          <line x1="${padLeft}" y1="${y}" x2="${W - padRight}" y2="${y}" stroke="#f0f0f0" stroke-dasharray="3,3" />
          <text x="${padLeft - 8}" y="${y + 3}" text-anchor="end" font-size="10" fill="#999999">${label}</text>
        `;
      }).join('');

      const xLabels = xLabelsArr.map((h, i) => `
        <text x="${xAt(i)}" y="${H - padBottom + 18}" text-anchor="middle" font-size="10" fill="#666666">${h}</text>
      `).join('');

      const dots = points.map(([x, y]) => `
        <circle cx="${x}" cy="${y}" r="3" fill="#ffffff" stroke="#8b7ff0" stroke-width="2" />
      `).join('');

      const boxW = 62;
      const boxH = 34;
      const labels = points.map(([x, y], i) => {
        const bx = Math.min(Math.max(x - boxW / 2, padLeft), W - padRight - boxW);
        const by = Math.max(y - 14 - boxH, 2);
        return `
          <g>
            <rect x="${bx}" y="${by}" width="${boxW}" height="${boxH}" rx="6" fill="#ffffff" stroke="#e3e3e3" stroke-width="1" />
            <text x="${bx + boxW / 2}" y="${by + 14}" text-anchor="middle" font-size="9" fill="#999999">${xLabelsArr[i]}</text>
            <text x="${bx + boxW / 2}" y="${by + 27}" text-anchor="middle" font-size="10" font-weight="700" fill="#333333">${valuePrefix}${values[i]}${decimals ? '.00' : ''}</text>
          </g>
        `;
      }).join('');

      el.innerHTML = `
        <svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
          <text x="12" y="${padTop + plotH / 2}" text-anchor="middle" font-size="10" fill="#666666" transform="rotate(-90 12 ${padTop + plotH / 2})">${axisLabel}</text>
          ${gridLines}
          <path d="${areaPath}" fill="rgba(139,127,240,0.15)" stroke="none" />
          <path d="${linePath}" fill="none" stroke="#8b7ff0" stroke-width="2" />
          ${dots}
          ${xLabels}
          <text x="${padLeft + plotW / 2}" y="${H - 4}" text-anchor="middle" font-size="10" fill="#666666">${xLabel}</text>
          ${labels}
        </svg>
      `;
    }

    renderSalesChart('hourly', 'sales');

    const chartPeriodSheet = document.getElementById('chart-period-sheet');
    const chartPeriodSheetBackdrop = document.getElementById('chart-period-sheet-backdrop');
    const chartPeriodList = document.getElementById('chart-period-list');
    const salesChartToggle = document.getElementById('sales-chart-toggle');

    function populateChartPeriodList() {
      if (!chartPeriodList) return;
      chartPeriodList.innerHTML = '';
      dashKpis.forEach((kpi, i) => {
        const labelText = kpi.querySelector('.m-dash-kpi__label')?.textContent || '';
        const metricKey = CHART_METRIC_ORDER[i];
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'm-chart-period-item';
        if (metricKey === currentMetric) item.classList.add('is-active');
        item.innerHTML = `
          <span class="m-dash-kpi__label">${labelText}</span>
          <svg class="m-chart-period-item__check" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        `;
        item.addEventListener('click', () => {
          renderSalesChart(currentPeriod, metricKey);
          scrollToKpiIndex(i);
          closeChartPeriodSheet();
        });
        chartPeriodList.appendChild(item);
      });
    }

    function openChartPeriodSheet() {
      populateChartPeriodList();
      chartPeriodSheet.classList.add('is-open');
      chartPeriodSheetBackdrop.classList.add('is-open');
    }

    function closeChartPeriodSheet() {
      chartPeriodSheet.classList.remove('is-open');
      chartPeriodSheetBackdrop.classList.remove('is-open');
    }

    function setDashboardPeriod(period) {
      if (SALES_CHART_DATA[period]) {
        renderSalesChart(period, 'sales');
      }
      applyKpiPeriod(period);
      dashTabs.forEach((t) => t.classList.toggle('m-dash-tab--active', t.dataset.period === period));
    }

    salesChartToggle?.addEventListener('click', () => {
      openChartPeriodSheet();
    });

    document.getElementById('chart-period-sheet-close')?.addEventListener('click', () => {
      closeChartPeriodSheet();
    });

    chartPeriodSheetBackdrop?.addEventListener('click', () => {
      closeChartPeriodSheet();
    });

    /* ---------- Payment Type donut (dependency-free SVG, works fully offline) ---------- */
    (function renderPaymentDonut() {
      const el = document.getElementById('chartPayment');
      if (!el) return;

      const segments = [
        { value: 35, color: '#5b93f5' }, // E-Wallet (blue) - top right
        { value: 8, color: '#f7a531' },  // Others (yellow) - bottom right
        { value: 15, color: '#1fd694' }, // Cash (green) - bottom left
        { value: 42, color: '#f0575a' }, // Credit Card (red) - left
      ];

      const size = 200;
      const cx = size / 2;
      const cy = size / 2;
      const r = 78;
      const strokeWidth = 20;
      // Round line caps eat into the angular gap (each cap extends strokeWidth/2
      // past its endpoint), so gapDeg must be large enough that the chord
      // distance between segment ends clears the combined cap width, or the
      // caps overlap and no gap is visible at all.
      const gapDeg = 19;
      const total = segments.reduce((sum, s) => sum + s.value, 0);
      const sweepTotal = 360 - gapDeg * segments.length;

      function pointAt(angleDeg) {
        const rad = ((angleDeg - 90) * Math.PI) / 180;
        return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
      }

      let angle = 0;
      const arcs = segments.map((seg) => {
        const sweep = (seg.value / total) * sweepTotal;
        const startAngle = angle;
        const endAngle = angle + sweep;
        angle = endAngle + gapDeg;
        const [x0, y0] = pointAt(startAngle);
        const [x1, y1] = pointAt(endAngle);
        const largeArc = sweep > 180 ? 1 : 0;
        return `<path d="M ${x0} ${y0} A ${r} ${r} 0 ${largeArc} 1 ${x1} ${y1}" fill="none" stroke="${seg.color}" stroke-width="${strokeWidth}" stroke-linecap="round" />`;
      }).join('');

      el.innerHTML = `
        <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
          ${arcs}
        </svg>
      `;
    })();

    /* ---------- Top 10 outlets bar chart (dependency-free SVG, works fully offline) ---------- */
    (function renderOutletsChart() {
      const el = document.getElementById('chartOutlets');
      if (!el) return;

      const labels = [
        ['Oiso KL', 'Store 1'],
        ['Oiso KL', 'Store 2'],
        ['Oiso KL', 'Store 3'],
        ['Oiso PJ', 'Store 1'],
        ['Oiso PJ', 'Store 2'],
        ['Oiso PJ', 'Store 3'],
        ['Oiso JB', 'Store 1'],
        ['Oiso JB', 'Store 2'],
        ['Oiso Penang', 'Store 1'],
        ['Oiso Penang', 'Store 2'],
      ];
      const values = [5000, 4600, 4000, 3500, 3000, 2600, 2000, 1600, 1000, 600];

      const slotW = 56;
      const H = 230;
      const padLeft = 46;
      const padRight = 16;
      const padTop = 14;
      const padBottom = 34;
      const plotW = slotW * values.length;
      const W = padLeft + plotW + padRight;
      const plotH = H - padTop - padBottom;

      const axisMax = 5000;
      const axisStep = 1000;

      function yAt(v) {
        return padTop + plotH - (v / axisMax) * plotH;
      }

      const gridSteps = [];
      for (let v = 0; v <= axisMax; v += axisStep) gridSteps.push(v);
      const gridLines = gridSteps.map((v) => {
        const y = yAt(v);
        const label = v === 0 ? '0' : `$${v}.00`;
        return `
          <line x1="${padLeft}" y1="${y}" x2="${W - padRight}" y2="${y}" stroke="#f0f0f0" stroke-dasharray="3,3" />
          <text x="${padLeft - 6}" y="${y + 3}" text-anchor="end" font-size="9" fill="#999999">${label}</text>
        `;
      }).join('');

      const barW = Math.min(26, slotW * 0.5);
      const bars = values.map((v, i) => {
        const barH = (v / axisMax) * plotH;
        const x = padLeft + slotW * i + (slotW - barW) / 2;
        const y = yAt(v);
        const cx = x + barW / 2;
        return `
          <rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="4" fill="#f7a531" />
          <text x="${cx}" y="${H - padBottom + 14}" text-anchor="middle" font-size="9" fill="#999999">${labels[i][0]}</text>
          <text x="${cx}" y="${H - padBottom + 25}" text-anchor="middle" font-size="9" fill="#999999">${labels[i][1]}</text>
        `;
      }).join('');

      el.innerHTML = `
        <svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
          ${gridLines}
          ${bars}
        </svg>
      `;
    })();

    /* ---------- Top 10 outlets: Day / Week / Month legend ---------- */
    const OUTLETS_LEGEND = {
      day: 'Today Sales',
      week: 'This Week Sales',
      month: 'This Month Sales',
    };

    const outletsSegBtns = document.querySelectorAll('#outlets-seg .m-dash-seg__btn');
    const outletsLegendLabel = document.getElementById('outlets-legend-label');

    outletsSegBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        outletsSegBtns.forEach((b) => b.classList.remove('m-dash-seg__btn--active'));
        btn.classList.add('m-dash-seg__btn--active');
        if (outletsLegendLabel) {
          outletsLegendLabel.textContent = OUTLETS_LEGEND[btn.dataset.period] || OUTLETS_LEGEND.day;
        }
      });
    });

    /* ---------- Top Sales Contribution: Filter By + View (bottom sheets) ---------- */
    const SALES_CONTRIB_VIEWS = {
      contribution: {
        title: 'Sales Contribution',
        columns: ['#', 'Group', 'Sales (RM)'],
        rows: [
          ['1', 'Beverage', '780.33'],
          ['2', 'Set Menu', '661.40'],
          ['3', 'Appetizers', '457.00'],
          ['4', 'Appetizers', '400.00'],
        ],
      },
      selling: {
        title: 'Selling Item',
        columns: ['Ranking', 'Group', 'Item', 'Quantity'],
        rows: [
          ['1', 'Set Menu', 'Fish and Chips', '200'],
          ['2', 'Beverage', 'Honey Lemon Tea', '180'],
          ['3', 'Set Menu', 'Burger Set', '110'],
          ['4', 'Set Menu', 'Roti Canai', '70'],
          ['5', 'Desserts', 'ABC (Ais Kacang)', '45'],
        ],
      },
    };

    /* ---------- Reusable table pagination ---------- */
    function createPagination({ tbodyId, sizeId, infoId, pageOfId, firstId, prevId, nextId, lastId, buildRowHtml }) {
      const tbody = document.getElementById(tbodyId);
      const sizeSelect = document.getElementById(sizeId);
      const infoEl = document.getElementById(infoId);
      const pageOfEl = document.getElementById(pageOfId);
      const firstBtn = document.getElementById(firstId);
      const prevBtn = document.getElementById(prevId);
      const nextBtn = document.getElementById(nextId);
      const lastBtn = document.getElementById(lastId);

      let allRows = [];
      let page = 1;

      function render() {
        const pageSize = parseInt(sizeSelect?.value, 10) || allRows.length || 1;
        const total = allRows.length;
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        if (page > totalPages) page = totalPages;
        if (page < 1) page = 1;
        const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
        const end = Math.min(page * pageSize, total);
        if (tbody) {
          tbody.innerHTML = allRows.slice(start - 1, end).map(buildRowHtml).join('');
        }
        if (infoEl) infoEl.textContent = total === 0 ? '0 to 0 of 0' : `${start} to ${end} of ${total}`;
        if (pageOfEl) pageOfEl.textContent = `Page ${page} of ${totalPages}`;
        if (firstBtn) firstBtn.disabled = page <= 1;
        if (prevBtn) prevBtn.disabled = page <= 1;
        if (nextBtn) nextBtn.disabled = page >= totalPages;
        if (lastBtn) lastBtn.disabled = page >= totalPages;
      }

      firstBtn?.addEventListener('click', () => { page = 1; render(); });
      prevBtn?.addEventListener('click', () => { page -= 1; render(); });
      nextBtn?.addEventListener('click', () => { page += 1; render(); });
      lastBtn?.addEventListener('click', () => { page = Infinity; render(); });
      sizeSelect?.addEventListener('change', () => { page = 1; render(); });

      return {
        setRows(rows) { allRows = rows; page = 1; render(); },
        refresh: render,
      };
    }

    const inventoryAlertPagination = createPagination({
      tbodyId: 'inventory-alert-tbody',
      sizeId: 'inventory-alert-page-size',
      infoId: 'inventory-alert-page-range',
      pageOfId: 'inventory-alert-page-of',
      firstId: 'inventory-alert-page-first',
      prevId: 'inventory-alert-page-prev',
      nextId: 'inventory-alert-page-next',
      lastId: 'inventory-alert-page-last',
      buildRowHtml: (row) => row,
    });

    inventoryAlertPagination.setRows([
      '<tr><td>Oiso PJ Store 2</td><td>Salmon</td><td>30</td><td><span class="m-dash-badge m-dash-badge--low">Low Stock</span></td></tr>',
      '<tr><td>Oiso KL Store 1</td><td>Rice</td><td>0</td><td><span class="m-dash-badge m-dash-badge--out">Out of Stock</span></td></tr>',
      '<tr><td>Oiso PJ Store 1</td><td>Chicken Chop</td><td>23</td><td><span class="m-dash-badge m-dash-badge--low">Low Stock</span></td></tr>',
    ]);

    const salesContribPagination = createPagination({
      tbodyId: 'sales-contrib-tbody',
      sizeId: 'sales-contrib-page-size',
      infoId: 'sales-contrib-page-range',
      pageOfId: 'sales-contrib-page-of',
      firstId: 'sales-contrib-page-first',
      prevId: 'sales-contrib-page-prev',
      nextId: 'sales-contrib-page-next',
      lastId: 'sales-contrib-page-last',
      buildRowHtml: (row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`,
    });

    const salesContribTitle = document.getElementById('sales-contrib-title');
    const salesContribThead = document.getElementById('sales-contrib-thead');
    const salesContribTbody = document.getElementById('sales-contrib-tbody');
    const salesContribFilterBtn = document.getElementById('sales-contrib-filter-btn');
    const salesContribFilterValue = document.getElementById('sales-contrib-filter-value');
    const salesContribFilterSheet = document.getElementById('sales-contrib-filter-sheet');
    const salesContribFilterSheetBackdrop = document.getElementById('sales-contrib-filter-sheet-backdrop');
    const salesContribFilterItems = document.querySelectorAll('#sales-contrib-filter-list .m-chart-period-item');
    const salesContribViewSegBtns = document.querySelectorAll('#sales-contrib-view-seg .m-dash-seg__btn');

    let salesContribCount = '5';
    let salesContribView = 'contribution';

    function updateSalesContribTitle() {
      if (salesContribTitle) {
        salesContribTitle.textContent = `Top ${salesContribCount} ${SALES_CONTRIB_VIEWS[salesContribView].title}`;
      }
    }

    function renderSalesContribTable() {
      const data = SALES_CONTRIB_VIEWS[salesContribView];
      const limit = parseInt(salesContribCount, 10) || data.rows.length;
      const rows = data.rows.slice(0, limit);
      if (salesContribThead) {
        salesContribThead.innerHTML = `<tr>${data.columns.map((c) => `<th>${c}</th>`).join('')}</tr>`;
      }
      salesContribPagination.setRows(rows);
    }

    function openSalesContribFilterSheet() {
      salesContribFilterSheet.classList.add('is-open');
      salesContribFilterSheetBackdrop.classList.add('is-open');
    }

    function closeSalesContribFilterSheet() {
      salesContribFilterSheet.classList.remove('is-open');
      salesContribFilterSheetBackdrop.classList.remove('is-open');
    }

    salesContribFilterBtn?.addEventListener('click', () => {
      openSalesContribFilterSheet();
    });

    document.getElementById('sales-contrib-filter-sheet-close')?.addEventListener('click', () => {
      closeSalesContribFilterSheet();
    });

    salesContribFilterSheetBackdrop?.addEventListener('click', () => {
      closeSalesContribFilterSheet();
    });

    salesContribFilterItems.forEach((item) => {
      item.addEventListener('click', () => {
        salesContribCount = item.dataset.value;
        salesContribFilterItems.forEach((i) => i.classList.toggle('is-active', i === item));
        if (salesContribFilterValue) salesContribFilterValue.textContent = salesContribCount;
        updateSalesContribTitle();
        renderSalesContribTable();
        closeSalesContribFilterSheet();
      });
    });

    salesContribViewSegBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        salesContribView = btn.dataset.view;
        salesContribViewSegBtns.forEach((b) => b.classList.toggle('m-dash-seg__btn--active', b === btn));
        updateSalesContribTitle();
        renderSalesContribTable();
      });
    });

    renderSalesContribTable();

/* ---------- Avatar menu ---------- */
(function () {
  const avatarBtn = document.getElementById('avatar-btn');
  const accountSheet = document.getElementById('account-sheet');

  function openAccountSheet() {
    accountSheet.classList.add('is-open');
  }

  function closeAccountSheet() {
    accountSheet.classList.remove('is-open');
  }

  avatarBtn?.addEventListener('click', openAccountSheet);
  document.getElementById('account-sheet-close')?.addEventListener('click', closeAccountSheet);
})();

/* ---------- Logout confirmation ---------- */
(function () {
  const backdrop = document.getElementById('logout-confirm-backdrop');
  const modal = document.getElementById('logout-confirm');
  const logoutBtn = document.getElementById('avatar-menu-logout');

  function openConfirm() {
    backdrop.classList.add('is-open');
    modal.classList.add('is-open');
  }

  function closeConfirm() {
    backdrop.classList.remove('is-open');
    modal.classList.remove('is-open');
  }

  logoutBtn?.addEventListener('click', openConfirm);
  backdrop?.addEventListener('click', closeConfirm);
  document.getElementById('logout-confirm-no')?.addEventListener('click', closeConfirm);

  document.getElementById('logout-confirm-yes')?.addEventListener('click', () => {
    window.location.href = 'mobile.html';
  });
})();
