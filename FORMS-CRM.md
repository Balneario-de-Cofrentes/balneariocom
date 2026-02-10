# Formularios CRM - Referencia de Implementacion

Fuente original: `/Users/juancartagena/CodeProjects/components-framer/src/`

## Endpoint Principal

```
POST https://app-api-lead-collector-backend-prod.azurewebsites.net/requests
Content-Type: application/json
```

## Formularios

### 1. Yupis.tsx (formulario completo)
Formulario principal de captacion de leads con campos dinamicos segun programa.

### 2. Yupis_Simplified.tsx (version reducida)
Solo nombre + telefono + programa. Rellena campos extra con defaults.
Redirect a `/gracias-balneario` on success.

### 3. FloatingFormButton.tsx
Boton flotante (bottom-right) que abre modal con Yupis_Simplified.
Animacion "genie" de entrada/salida.

### 4. Prebooking.tsx (NO replicar)
Pre-reserva interna. Usa `localhost:8033/pre-bookings` (sistema interno, no expuesto).

---

## Campos del Formulario Principal

### Campos visibles

| Campo | Tipo | Validacion |
|---|---|---|
| Nombre completo | text | Regex espanola: soporta "de", "del", "la", "las", "los", "y", "i" como conectores |
| Telefono | tel | 9 digitos, empieza por 6/7/8/9, opcionalmente prefijo 0034 |
| Cuando quiere venir | select | 0-12 meses |
| Programa | radio | termalismo / termalismo_longevity / longevity_club |
| Aceptar condiciones | checkbox | Obligatorio |

### Campos dinamicos (segun programa)

**termalismo_longevity y longevity_club:**
- `programInterests` - Checkboxes de sub-programas (minimo 1)
- `objectives` - 11 opciones: peso, energia, dolor, sueno, estres, memoria, movilidad, piel, digestion, inmunidad, envejecimiento (minimo 1)
- `objectivesOther` - Texto libre si selecciona "otros"

**Solo longevity_club (PRO):**
- `diagnoses` - 15 condiciones medicas (obligatorio)
- `diagnosesOther` - Texto libre si selecciona "otros"
- `habits` - 13 preguntas de estilo de vida (obligatorio)

### Campos invisibles (tracking automatico)

| Campo | Fuente |
|---|---|
| `ip` | GET `https://api.ipify.org?format=json` |
| `gclid` | URL param (Google Ads click ID) |
| `gadSource` | URL param `gad_source` |
| `fbclid` | URL param (Facebook click ID) |
| `fbp` | Cookie `_fbp` (Facebook Pixel) |
| `utmSource` | URL param `utm_source` |
| `utmMedium` | URL param `utm_medium` |
| `utmCampaign` | URL param `utm_campaign` |
| `utmContent` | URL param `utm_content` |
| `utmTerm` | URL param `utm_term` |
| `browser` | `{appCodeName, appName, appVersion, language, platform, userAgent}` |
| `paramsUrl` | Todos los URL params como objeto |
| `source` | `"form_web_balneario_com"` |
| `interest` | `"termalismo"` |
| `campaignId` | `"4fe35360-bf2d-9c0e-21f0-6710d122eacd"` |

### Payload JSON (ejemplo completo)

```json
{
  "ip": "83.xx.xx.xx",
  "source": "form_web_balneario_com",
  "interest": "termalismo",
  "campaignId": "4fe35360-bf2d-9c0e-21f0-6710d122eacd",
  "firstName": "Maria",
  "lastName": "Garcia Lopez",
  "phone": "612345678",
  "interestedInComingMonths": "3",
  "gclid": "",
  "gadSource": "",
  "fbclid": "",
  "fbp": "",
  "utmSource": "",
  "utmMedium": "",
  "utmCampaign": "",
  "utmContent": "",
  "utmTerm": "",
  "paramsUrl": {},
  "browser": {
    "appCodeName": "Mozilla",
    "appName": "Netscape",
    "appVersion": "5.0 ...",
    "language": "es-ES",
    "platform": "MacIntel",
    "userAgent": "Mozilla/5.0 ..."
  },
  "programInterests": ["dolor", "antiinflamatorio"],
  "objectives": ["pain", "mobility"],
  "objectivesOther": "",
  "diagnoses": [],
  "diagnosesOther": "",
  "habits": []
}
```

## Post-Envio

1. Push a GTM dataLayer:
   ```js
   window.dataLayer.push({
     event: "form_submit",
     program: "termalismo_longevity",
     utm_source: "...",
     utm_medium: "...",
     utm_campaign: "..."
   })
   ```
2. Redirect a `/gracias-balneario`

## Validacion de Nombre (regex)

Soporta nombres espanoles con conectores: de, del, la, las, los, y, i.
Split nombre/apellido: primer token es firstName, resto es lastName.

## Validacion de Telefono (regex)

```
/^(0034)?[6789]\d{8}$/
```
Limpia espacios y guiones antes de validar.

## Notas

- El formulario simplificado "fakea" campos extra con defaults (`interestedInComingMonths: "0"`, arrays vacios)
- La pagina `/reserva` actualmente es estatica, hay que conectarla con este formulario
- Considerar tambien el boton flotante (FloatingFormButton) para todas las paginas
