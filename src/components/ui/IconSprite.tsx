/**
 * Спрайт иконок Lark DS - 38 собственных глифов.
 * Сетка 24×24, штрих 1.5, cap и join round, outline, currentColor.
 * Сторонние наборы запрещены правилами системы.
 *
 * Монтируется один раз в <body>, дальше на символы ссылается <use href="#id">.
 * Инлайн, а не внешний файл: внешний <use> непредсказуемо работает в Safari.
 * Метаданные C2PA из исходного файла не переносились - на отрисовку они не
 * влияют, а весят больше самой графики.
 */
export function IconSprite() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "none" }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <symbol id="lark-sunrise" viewBox="0 0 24 24"><circle cx="12" cy="14" r="4" /><path d="M3 19h18M12 5v2M6.2 8.2l1.4 1.4M17.8 8.2l-1.4 1.4" /></symbol>
      <symbol id="lark-feather" viewBox="0 0 24 24"><path d="M20 4C13 4 8 8.5 8 15v4" /><path d="M20 4c0 8-5.5 13-12.5 13H5" /><path d="M4 20l5.5-5.5" /></symbol>
      <symbol id="lark-trajectory" viewBox="0 0 24 24"><path d="M3 19c4.5 0 6.5-3.5 8.5-8S16 4 20 4" /><circle cx="20" cy="4.5" r="1.6" /><circle cx="11.5" cy="11" r="1.1" /></symbol>
      <symbol id="lark-wing" viewBox="0 0 24 24"><path d="M3 18c6.5 0 11-3 13.5-7.5C18 8 19.5 6.5 21.5 6c-.5 8.5-6.5 14-14 14H3z" /></symbol>
      <symbol id="lark-peak" viewBox="0 0 24 24"><path d="M3 19l6.5-11 4 6.5L16 10l5 9z" /></symbol>
      <symbol id="lark-takeoff" viewBox="0 0 24 24"><path d="M7 17L17 7" /><path d="M9.5 7H17v7.5" /></symbol>
      <symbol id="lark-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M16.2 16.2L21 21" /></symbol>
      <symbol id="lark-profile" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4.5 20.5c0-4 3.4-6 7.5-6s7.5 2 7.5 6" /></symbol>
      <symbol id="lark-bell" viewBox="0 0 24 24"><path d="M18 16.5V11a6 6 0 10-12 0v5.5L4.5 19h15z" /><path d="M10 22h4" /></symbol>
      <symbol id="lark-growth" viewBox="0 0 24 24"><path d="M3 17.5l5.5-6 4 3L19 6" /><path d="M15.5 6H19v3.5" /></symbol>
      <symbol id="lark-plus" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 8.2v7.6M8.2 12h7.6" /></symbol>
      <symbol id="lark-settings" viewBox="0 0 24 24"><path d="M4 8h8M17 8h3M4 16h3M12 16h8" /><circle cx="14.5" cy="8" r="2.2" /><circle cx="9.5" cy="16" r="2.2" /></symbol>
      <symbol id="lark-check" viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5" /></symbol>
      <symbol id="lark-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></symbol>
      <symbol id="lark-chevron-right" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></symbol>
      <symbol id="lark-arrow-right" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6" /></symbol>
      <symbol id="lark-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5.5l3.5 2" /></symbol>
      <symbol id="lark-wallet" viewBox="0 0 24 24"><path d="M3 8.5A2.5 2.5 0 015.5 6H18a2 2 0 012 2v9a2 2 0 01-2 2H5.5A2.5 2.5 0 013 16.5z" /><path d="M14 10.5h7v4h-7a2 2 0 010-4z" /></symbol>
      <symbol id="lark-message" viewBox="0 0 24 24"><path d="M20 8v6.5a2 2 0 01-2 2H9.5L5 20.5V8a2 2 0 012-2h11a2 2 0 012 2z" /></symbol>
      <symbol id="lark-star" viewBox="0 0 24 24"><path d="M12 3.5l2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.9l6-.8z" /></symbol>
      <symbol id="lark-filter" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4" /></symbol>
      <symbol id="lark-upload" viewBox="0 0 24 24"><path d="M12 16V4M8 8l4-4 4 4" /><path d="M4 15v3a2 2 0 002 2h12a2 2 0 002-2v-3" /></symbol>
      <symbol id="lark-chevron-down" viewBox="0 0 24 24"><path d="M5 9l7 7 7-7" /></symbol>
      <symbol id="lark-chevron-left" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></symbol>
      <symbol id="lark-chevron-up-down" viewBox="0 0 24 24"><path d="M8 10l4-4 4 4M8 14l4 4 4-4" /></symbol>
      <symbol id="lark-calendar" viewBox="0 0 24 24"><path d="M4 8.5A2.5 2.5 0 016.5 6h11A2.5 2.5 0 0120 8.5v9A2.5 2.5 0 0117.5 20h-11A2.5 2.5 0 014 17.5z" /><path d="M4 11h16M8.5 4v3.5M15.5 4v3.5" /></symbol>
      <symbol id="lark-trash" viewBox="0 0 24 24"><path d="M4.5 7h15M9 7V4.5h6V7" /><path d="M6.5 7l.8 11.2A2 2 0 009.3 20h5.4a2 2 0 002-1.8L17.5 7" /></symbol>
      <symbol id="lark-paperclip" viewBox="0 0 24 24"><path d="M19 11.5l-7.4 7.4a4.2 4.2 0 01-6-6l7.6-7.6a2.8 2.8 0 014 4L9.6 17" /></symbol>
      <symbol id="lark-send" viewBox="0 0 24 24"><path d="M20.5 4L3.5 11l6.5 2.5L12.5 20z" /><path d="M20.5 4l-10.5 9.5" /></symbol>
      <symbol id="lark-more" viewBox="0 0 24 24"><circle cx="5.5" cy="12" r="1.3" /><circle cx="12" cy="12" r="1.3" /><circle cx="18.5" cy="12" r="1.3" /></symbol>
      <symbol id="lark-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 11v5.5" /><circle cx="12" cy="7.8" r="1" /></symbol>
      <symbol id="lark-warning" viewBox="0 0 24 24"><path d="M10.4 4.6L3 18a1.8 1.8 0 001.6 2.6h14.8A1.8 1.8 0 0021 18L13.6 4.6a1.8 1.8 0 00-3.2 0z" /><path d="M12 9.5v4.5" /><circle cx="12" cy="17" r="1" /></symbol>
      <symbol id="lark-minus" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M8.2 12h7.6" /></symbol>
      <symbol id="lark-file" viewBox="0 0 24 24"><path d="M13.5 3.5H7a2 2 0 00-2 2v13a2 2 0 002 2h10a2 2 0 002-2V9z" /><path d="M13.5 3.5V9H19" /></symbol>
      <symbol id="lark-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></symbol>
      <symbol id="lark-logout" viewBox="0 0 24 24"><path d="M14 4.5H6.5a2 2 0 00-2 2v11a2 2 0 002 2H14" /><path d="M18.5 12H10M15 8.5l3.5 3.5L15 15.5" /></symbol>
      <symbol id="lark-eye" viewBox="0 0 24 24"><path d="M2.8 12S6.5 6 12 6s9.2 6 9.2 6-3.7 6-9.2 6-9.2-6-9.2-6z" /><circle cx="12" cy="12" r="3" /></symbol>
      <symbol id="lark-shield" viewBox="0 0 24 24"><path d="M12 3.5l7 2.4v5.6c0 4.4-2.8 7.6-7 9-4.2-1.4-7-4.6-7-9V5.9z" /><path d="M9 12.2l2.2 2.3L15.2 10" /></symbol>

      {/* ОЖИДАЮТ ГЛИФА В ДИЗАЙН-СИСТЕМЕ.
          Этих ролей в наборе из 38 глифов нет, а правило системы -
          не брать иконки со стороны. Контуры взяты из прежнего набора
          сайта и нарисованы по той же спеке (24×24, штрих 1.5, outline).
          Удалить, как только глифы появятся в ДС. */}
      <symbol id="site-moon" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></symbol>
      <symbol id="site-phone" viewBox="0 0 24 24"><path d="M6.5 3h3l1.5 4.5-2 1.5a13 13 0 0 0 6 6l1.5-2L21 18v3a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1Z" /></symbol>
      <symbol id="site-spark" viewBox="0 0 24 24"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" /></symbol>
    </svg>
  );
}
