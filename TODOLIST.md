# TODO pendiente (no bloqueado por código local)

- [ ] Configurar proveedor real de newsletter para `/api/newsletter` vía `NEWSLETTER_WEBHOOK_URL` (ahora usa fallback en memoria, útil para dev/staging pero no persistente en producción).
- [ ] Añadir protección anti-bot de nivel producción para leads/newsletter (Cloudflare Turnstile o reCAPTCHA + validación server-side del token).
- [ ] Migrar rate-limit en memoria a almacenamiento compartido (Redis/KV) para que funcione de forma consistente en múltiples instancias/serverless cold starts.
- [ ] Validar legal/compliance del texto de consentimiento y política de datos con el equipo legal (el checkbox ya está implementado en formularios).
- [ ] Definir y aplicar CSP estricta en producción, ajustada a todos los terceros reales (chatbot, fuentes, analítica, CRM).
- [ ] Completar smoke QA manual en dispositivos reales (iOS/Android + desktop) para overlays flotantes (chat + reservar) y navegación con teclado/lector de pantalla.
- [ ] Confirmar compilación de producción en un entorno con salida a internet: en este entorno bloqueado no se pueden descargar Google Fonts (`Forum`, `Inter`, `Raleway`).
