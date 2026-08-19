    const toggleBtn = document.querySelector('.m-toggle-password');
    const passwordInput = document.getElementById('m-password');
    const eyeIcon = toggleBtn.querySelector('.m-eye-icon');
    toggleBtn.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      eyeIcon.src = isPassword ? 'assets/showeye.svg' : 'assets/closeeye.svg';
      toggleBtn.setAttribute('aria-pressed', String(isPassword));
      toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });

    const viewLogin = document.getElementById('view-login');
    const viewBrand = document.getElementById('view-brand');
    const viewDashboard = document.getElementById('view-dashboard');

    function showView(view) {
      [viewLogin, viewBrand, viewDashboard].forEach((v) => { v.hidden = v !== view; });
      window.scrollTo(0, 0);
    }

    document.getElementById('m-login-btn').addEventListener('click', () => {
      showView(viewBrand);
    });

    document.getElementById('brand-oiso').addEventListener('click', (e) => {
      e.preventDefault();
      showView(viewDashboard);
    });

    document.getElementById('brand-mimi').addEventListener('click', (e) => {
      e.preventDefault();
      // No dashboard built for MIMI yet.
    });

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

    function openBrandSheet() {
      brandSheet.classList.add('is-open');
    }

    function closeBrandSheet() {
      brandSheet.classList.remove('is-open');
    }

    document.getElementById('store-select-oiso')?.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawerInstant();
      openBrandSheet();
    });

    document.getElementById('brand-sheet-back')?.addEventListener('click', () => {
      closeBrandSheet();
      openDrawer();
    });

    document.getElementById('brand-sheet-oiso')?.addEventListener('click', (e) => {
      e.preventDefault();
      closeBrandSheet();
    });

    document.getElementById('brand-sheet-mimi')?.addEventListener('click', (e) => {
      e.preventDefault();
      closeBrandSheet();
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

    if (window.Chart) {
      const primary = '#be2026';

      if (window.ChartDataLabels) {
        Chart.register(window.ChartDataLabels);
      }

      const salesHours = ['12am', '2am', '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'];
      const salesValues = [80, 50, 10, 90, 350, 580, 980, 920, 420, 600, 500, 300];

      new Chart(document.getElementById('chartSales'), {
        type: 'line',
        data: {
          labels: salesHours,
          datasets: [{
            data: salesValues,
            borderColor: '#8b7ff0',
            backgroundColor: 'rgba(139,127,240,0.15)',
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#8b7ff0',
            pointBorderWidth: 2,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { top: 36 } },
          plugins: {
            legend: { display: false },
            datalabels: {
              anchor: 'end',
              align: 'top',
              offset: 6,
              backgroundColor: '#ffffff',
              borderColor: '#e3e3e3',
              borderWidth: 1,
              borderRadius: 6,
              padding: { top: 3, bottom: 3, left: 6, right: 6 },
              font: [{ size: 9, weight: '700' }, { size: 9, weight: '400' }],
              color: '#333333',
              formatter: (value, ctx) => {
                const hour = salesHours[ctx.dataIndex];
                return [hour, `RM${value}.00`];
              },
              textAlign: 'center',
              lineHeight: 1.3,
            },
          },
          scales: {
            x: { ticks: { font: { size: 10 } }, grid: { display: false } },
            y: { min: 0, max: 1050, ticks: { stepSize: 200, font: { size: 10 } }, grid: { color: '#f0f0f0' } },
          },
        },
      });

      new Chart(document.getElementById('chartPayment'), {
        type: 'doughnut',
        data: {
          labels: ['Credit Card', 'E-Wallet', 'Cash', 'Others'],
          datasets: [{
            data: [42, 35, 15, 8],
            backgroundColor: ['#f0393c', '#3b82f6', '#22c55e', '#f59e0b'],
            borderWidth: 0,
          }],
        },
        options: {
          responsive: true,
          cutout: '72%',
          plugins: { legend: { display: false } },
        },
      });

      new Chart(document.getElementById('chartOutlets'), {
        type: 'bar',
        data: {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
          datasets: [{
            data: [5300, 4800, 4500, 3500, 3200, 2900, 1600, 1200],
            backgroundColor: '#f7a531',
            borderRadius: 4,
            maxBarThickness: 28,
          }],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { font: { size: 10 } }, grid: { display: false } },
            y: { ticks: { font: { size: 10 } }, grid: { color: '#f0f0f0' } },
          },
        },
      });
    }

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
  const accountSheet = document.getElementById('account-sheet');
  const viewLogin = document.getElementById('view-login');
  const viewBrand = document.getElementById('view-brand');
  const viewDashboard = document.getElementById('view-dashboard');

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
    closeConfirm();
    accountSheet?.classList.remove('is-open');
    [viewLogin, viewBrand, viewDashboard].forEach((v) => { if (v) v.hidden = v !== viewLogin; });
    window.scrollTo(0, 0);
  });
})();
