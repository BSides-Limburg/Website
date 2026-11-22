/* ==========================================================================
   BSides Limburg — site configuration
   --------------------------------------------------------------------------
   This is the ONE file volunteers need to edit for day-to-day changes:
   ticket sale going live, CFP opening/closing, schedule release.
   Save, commit, push — GitHub Pages does the rest.
   ========================================================================== */
window.BSIDES = {
  edition: "2027",

  // Conference start (ISO 8601 with timezone). Drives the countdown.
  eventStart: "2027-03-12T08:00:00+01:00",
  eventDateLabel: "12 March 2027",

  venue: {
    name: "Corda Campus",
    building: "Corda 1",
    street: "Kempische Steenweg 293/16",
    city: "3500 Hasselt, Belgium",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Corda+Campus+Kempische+Steenweg+293+Hasselt",
    osmUrl: "https://www.openstreetmap.org/search?query=Corda%20Campus%20Hasselt",
  },

  /* ---- Tickets (Weezevent) ------------------------------------------------
     status: "soon"  -> placeholder ("Ticket sale opens soon")
             "live"  -> embeds the Weezevent widget below
             "soldout" -> shows a sold-out message
     widgetSrc: in the Weezevent back office go to
       Event > Sales channels > Widget, choose the "neo" widget and copy the
       value of the `data-src` attribute, e.g.
       "https://widget.weezevent.com/ticket/E1234567/?code=12345&locale=en-GB&width_auto=1&color_primary=FDDA24"
     shopUrl: the public Weezevent shop link (used for the header button and
       as a fallback when the widget can't load), e.g.
       "https://my.weezevent.com/bsides-limburg-2027"
  ------------------------------------------------------------------------- */
  tickets: {
    status: "soon",
    widgetSrc: "",
    shopUrl: "",
  },

  /* ---- Call for Papers (pretalx) ------------------------------------------
     status: "soon" | "open" | "closed"
     url:      your pretalx CFP page
     deadline: free text shown when open, e.g. "15 December 2026, 23:59 CET"
  ------------------------------------------------------------------------- */
  cfp: {
    status: "open",
    url: "https://schedule.bsides-limburg.be/bsides-limburg-2027/cfp",
    deadline: "",
  },

  /* ---- Schedule (pretalx widget) ------------------------------------------
     live: false -> placeholder; true -> embeds the pretalx schedule widget.
     pretalxEvent: base URL of the pretalx event, WITH trailing slash.
       If you create a new pretalx event for 2027 (e.g. "bsides-limburg-2027")
       update this URL and the CFP url above.
     Make sure the widget is enabled in pretalx:
       Settings > Widget > "Allow widget usage" (and release the schedule).
  ------------------------------------------------------------------------- */
  schedule: {
    live: false,
    pretalxEvent: "https://schedule.bsides-limburg.be/bsides-limburg-2027/",
  },

  /* ---- Previous editions (Archive dropdown in the header) ----------------
     Newest first. Paths are relative to the site root.
  ------------------------------------------------------------------------- */
  archive: [
    { label: "2026 edition", path: "editions/2026.html" },
    { label: "2025 edition", path: "editions/2025.html" },
  ],

  contact: {
    email: "info@bsides-limburg.be",
    linkedin: "https://www.linkedin.com/company/bsides-limburg",
  },
};
