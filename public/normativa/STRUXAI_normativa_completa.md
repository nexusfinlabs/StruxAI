# STRUXAI · Normativa aplicable

> **Marco regulatorio completo del cálculo, verificación y construcción sostenible de edificios.** Este documento recopila las normativas que STRUXAI verifica automáticamente sobre cada modelo analítico extraído de Revit. Cubre España, Estados Unidos, Australia, Chile y Colombia.

---

## Tabla de contenidos

1. España — Marco legal base
2. España — Código Técnico (CTE)
3. España — Hormigón EHE-08
4. España — Madera y CLT
5. España — Sísmica NCSR-02
6. España — Eurocódigos
7. España — Instalaciones térmicas y renovables
8. España — Sostenibilidad
9. Internacional — Resumen comparativo
10. USA — IBC + ASCE 7 + ACI 318
11. Australia — NCC + AS/NZS
12. Chile — OGUC + NCh + DS 60/61
13. Colombia — NSR-10 + Ley 400 + AIS
14. Mapeo cruzado por familia normativa
15. Glosario
16. ¿Cómo lo verifica STRUXAI?

---

# ESPAÑA

## España — Marco legal base

| Norma | Año | Alcance | Obligatoriedad |
|---|---|---|---|
| **LOE** — Ley de Ordenación de la Edificación | 1999 | Requiere proyecto de arquitecto, licencia de obra, dirección facultativa y **Seguro Decenal** de 10 años | Obligatoria en toda edificación |
| **PGOU** — Plan General de Ordenación Urbana | Variable | Normas municipales de suelo, volumen, altura y uso permitido | Obligatoria por municipio |
| **Leyes de Suelo autonómicas** | Variable | Regulación CCAA sobre zonificación y usos | Obligatoria por Comunidad Autónoma |

---

## España — Código Técnico (CTE)

Normativa **base** que fija los requisitos mínimos de todo edificio en España. Se estructura en Documentos Básicos (DB) organizados por exigencia.

### DB-SE · Seguridad Estructural

| Artículo | Objeto | STRUXAI verifica |
|---|---|---|
| **DB-SE** general | Principios de seguridad estructural | Equilibrio global, resistencia, aptitud al servicio |
| **DB-SE-AE** | Acciones en la edificación | Sobrecargas uso (Art. 3.1), viento (Art. 3.3), nieve, térmicas |
| **DB-SE-C** | Cimentaciones | Capacidad portante, asientos, deslizamiento |
| **DB-SE-A** | Acero estructural | Resistencia, pandeo, uniones atornilladas y soldadas |
| **DB-SE-F** | Fábrica (muros de carga) | Resistencia a compresión y flexo-compresión |
| **DB-SE-M** | Madera estructural | Propiedades, ELU, ELS, resistencia al fuego |
| **DB-SE Art. 4.3.3** | Deformaciones admisibles | Flecha L/250 en voladizos, L/400 en vigas |

### DB-SI · Seguridad en caso de Incendio

| Artículo | Aplicación típica |
|---|---|
| **DB-SI 1** | Propagación interior (sectores de incendio) |
| **DB-SI 2** | Propagación exterior (fachadas, medianerías) |
| **DB-SI 3** | Evacuación de ocupantes |
| **DB-SI 4** | Instalaciones de protección contra incendios |
| **DB-SI 5** | Intervención de bomberos |
| **DB-SI 6** | Resistencia al fuego estructural (R60, R90, R120) |

### DB-SUA · Seguridad de Utilización y Accesibilidad

| Artículo | Objeto |
|---|---|
| **DB-SUA 1** | Seguridad frente a caídas: barandillas Q ≥ 1.6 kN/m, suelos antideslizantes |
| **DB-SUA 2** | Riesgo de impacto y atrapamiento |
| **DB-SUA 9** | Accesibilidad: rampas, ascensores, ancho de paso |

### DB-HE · Ahorro de Energía

| Artículo | Aplicación |
|---|---|
| **DB-HE 0** | Limitación del consumo energético primario no renovable |
| **DB-HE 1** | Limitación de demanda energética (envolvente) |
| **DB-HE 4** | Contribución solar mínima de ACS |
| **DB-HE 5** | Contribución fotovoltaica mínima |

### DB-HR · Protección frente al Ruido
Exige aislamiento acústico mínimo a ruido aéreo y de impactos.

### DB-HS · Salubridad

| Artículo | Objeto |
|---|---|
| **DB-HS 1** | Protección frente a humedad |
| **DB-HS 3** | Calidad del aire interior (ventilación) |

---

## España — Hormigón EHE-08

**Instrucción de Hormigón Estructural (2008).** Obligatoria para edificios con estructura de hormigón armado o pretensado.

### Estados Límite de Servicio (ELS)

| Artículo | Verificación |
|---|---|
| **Art. 42** | Flechas activas y totales — límite L/250 voladizos, L/400 vigas |
| **Art. 49** | Fisuración — ancho máximo según clase exposición |

### Estados Límite Últimos (ELU)

| Artículo | Verificación |
|---|---|
| **Art. 44** | Flexión simple y compuesta |
| **Art. 44.2** | Cortante y rasante |
| **Art. 46** | **Punzonamiento** en losas macizas |
| **Art. 49** | Pandeo de pilares esbeltos |
| **Art. 50** | Compresión compuesta en pilares |

### Clases de exposición y durabilidad
Cada elemento se clasifica según ambiente (I, IIa, IIb, IIIa, IIIb, IIIc, IV, Qa/b/c). STRUXAI mapea esto al recubrimiento mínimo y armado requerido.

---

## España — Madera y CLT

### CTE DB-SE-M · Norma española obligatoria
Regula diseño y seguridad de estructuras de madera: propiedades por clase resistente (C14–C30 madera aserrada, GL20h–GL32h laminada), factores de modificación, uniones, resistencia al fuego.

### Eurocódigo 5 (EN 1995-1-1)
Norma europea de diseño avanzado. Ampliamente usado para **CLT (Cross Laminated Timber)** y uniones complejas.

### Productos certificados (marcado CE)

| Norma | Producto |
|---|---|
| **UNE-EN 16351** | Paneles CLT |
| **UNE-EN 14081** | Madera aserrada estructural |
| **UNE-EN 14080** | Madera laminada encolada (Glulam) |
| **UNE-EN 14374** | LVL (Laminated Veneer Lumber) |
| **UNE-EN 1912** | Asignación de clases resistentes |

---

## España — Sísmica NCSR-02

**Norma de Construcción Sismorresistente (2002).**

### Zonas sísmicas
- **Zona A** — ab < 0.04 g: voluntario
- **Zona B** — 0.04 g ≤ ab < 0.12 g: obligatorio en alta ocupación
- **Zona C** — 0.12 g ≤ ab < 0.16 g: obligatorio
- **Zona D** — ab ≥ 0.16 g: obligatorio en todo edificio

### Verificaciones típicas
- Análisis modal espectral o simplificado
- Torsión accidental y efectos P-Δ
- Ductilidad y disipación energética
- Distorsión máxima entre plantas (drift)

---

## España — Eurocódigos

| Eurocódigo | Objeto |
|---|---|
| **EN 1990** | Bases de cálculo estructural |
| **EN 1991** | Acciones sobre estructuras |
| **EN 1992** | Estructuras de hormigón |
| **EN 1993** | Estructuras de acero |
| **EN 1994** | Estructuras mixtas acero-hormigón |
| **EN 1995** | Estructuras de madera (incluye CLT) |
| **EN 1996** | Estructuras de fábrica |
| **EN 1997** | Proyecto geotécnico |
| **EN 1998** | Proyecto sísmico |
| **EN 1999** | Estructuras de aluminio |

---

## España — Instalaciones térmicas y renovables

### RITE (RD 1027/2007)
Reglamento de Instalaciones Térmicas. Obligatorio para calefacción, climatización y ACS.

### Biomasa

| Norma | Objeto |
|---|---|
| **UNE-EN 303-5** | Calderas biomasa — clases 3, 4, 5 |
| **RD 413/2014** | Producción energía renovables |
| **ENplus A1 / A2** | Certificación pellet |
| **UNE-EN 14961** | Biocombustibles sólidos |

### Autoconsumo fotovoltaico

| Norma | Objeto |
|---|---|
| **RD 244/2019** | Autoconsumo individual y compartido |
| **RD 900/2015** | Condiciones administrativas |
| **UNE-EN 61215** | Módulos fotovoltaicos cristalinos |
| **IEC 62446-1** | Inspección y puesta en marcha PV |

### Passivhaus
Demanda calefacción < 15 kWh/m²·año, hermeticidad n50 ≤ 0.6 h⁻¹. Certificado por Passivhaus Institut (Darmstadt) e Instituto Passivhaus en España.

---

## España — Sostenibilidad

### Directivas europeas
- **EPBD 2030** — todos los nuevos edificios **Zero Emission** desde 2030 (2027 públicos)
- **EU Taxonomy** — clasificación actividades sostenibles
- **EU Green Deal** — neutralidad climática 2050

### Análisis de Ciclo de Vida (ACV)
- **UNE-EN 15978** — comportamiento medioambiental
- **EPD** — declaración ambiental verificada
- Huella de carbono incorporado

### Madera certificada
- **FSC** — Forest Stewardship Council
- **PEFC** — Programme for the Endorsement of Forest Certification
- **EU Timber Regulation (EUTR)** — prohibición madera ilegal

### Certificaciones voluntarias
- LEED (USGBC, USA)
- BREEAM (UK)
- VERDE (Green Building Council España)
- DGNB (Alemania)

---

# INTERNACIONAL

## Internacional — Resumen comparativo

| País | Norma maestra | Acciones | Hormigón | Acero | Madera | Sísmica |
|---|---|---|---|---|---|---|
| **España** | CTE | DB-SE-AE | EHE-08 | DB-SE-A / EAE | DB-SE-M | NCSR-02 |
| **USA** | IBC 2024 | ASCE 7-22 | ACI 318-19 | AISC 360-22 | NDS 2024 | ASCE 7-22 + ASCE 41-23 |
| **Australia** | NCC 2025 | AS/NZS 1170 | AS 3600:2018 | AS 4100:2020 | AS 1720.1 | AS 1170.4-2007 |
| **Chile** | OGUC | NCh 1537 / 432 | NCh 430 + DS 60 | NCh 427 | NCh 1198 | NCh 433 + DS 61 |
| **Colombia** | NSR-10 | Título B | Título C (ACI 318) | Título F | Título G | Título A |

**Observación clave**: tres de cinco países (USA, Chile, Colombia) toman ACI 318 como base de hormigón y AISC 360 como base de acero. Australia mantiene sistema propio AS/NZS armonizado con Nueva Zelanda.

---

## USA — IBC + ASCE 7 + ACI 318

USA no tiene código federal. El **International Code Council (ICC)** publica códigos modelo cada 3 años; cada estado/condado los adopta independientemente.

### Código maestro

| Código | Edición vigente | Aplicación |
|---|---|---|
| **IBC 2024** | Estados adoptando 2025–2027 | Comerciales, multi-familiares y públicos |
| **IRC 2024** | Adoptado | Vivienda unifamiliar y bifamiliar hasta 3 plantas |
| **IECC 2024** | Adoptado | Eficiencia energética |
| **IFC 2024** | Adoptado | Protección contra incendios |
| **CBC 2022** | California (basado en IBC 2021) | Modificaciones estatales California |

> **Novedad IBC 2024**: por primera vez incluye **diseño contra cargas de tornado** (Capítulo 32) alineado con ASCE 7-22. Amplía mass timber Tipo IV-A/B/C hasta 18 plantas.

### ASCE 7-22 · Cargas

| Edición | Estado |
|---|---|
| **ASCE 7-22** | Vigente con IBC 2024. Incluye cargas de tornado (WT) por primera vez |
| ASCE 7-16 | Vigente en jurisdicciones con IBC 2018/2021 |
| ASCE 41-23 | Evaluación sísmica de edificios existentes |

### ACI 318-19 · Hormigón

| Capítulo | Objeto |
|---|---|
| **Cap. 5** | Cargas y combinaciones |
| **Cap. 7-9** | Losas en una y dos direcciones |
| **Cap. 10** | Vigas y elementos a flexión |
| **Cap. 18** | Diseño sísmico especial (Special Moment Frames) |
| **Cap. 22** | Cortante (incluye punzonamiento — equivalente EHE Art. 46) |

### AISC 360-22 · Acero
Cubre LRFD y ASD. Complementarias: **AISC 341-22** (sísmico), **AISC 358-22** (uniones precualificadas).

### Madera y mass timber
- **NDS 2024** — National Design Specification for Wood Construction
- **APA PRG 320** — paneles CLT
- IBC 2024 reconoce mass timber Tipo IV-A/B/C hasta 18 plantas

### Eficiencia energética
- **ASHRAE 90.1-2022** — Energy Standard for Buildings
- **IECC 2024** — Continuous insulation, blower door obligatorio

### Certificaciones voluntarias
LEED v4.1 · Living Building Challenge · WELL · Passive House (PHIUS)

---

## Australia — NCC + AS/NZS

Sistema federal coordinado por **Australian Building Codes Board (ABCB)**.

### Código maestro

| Volumen | Contenido |
|---|---|
| **Volume 1 (BCA)** | Edificios Clase 2-9 |
| **Volume 2 (BCA)** | Clase 1 y 10 (vivienda, garajes) |
| **Volume 3 (PCA)** | Plumbing Code of Australia |

> **NCC 2025** publicado preview el 1 febrero 2026, adopción opcional desde 1 mayo 2026. Cambios principales: gestión del agua, fuego en parkings, eficiencia energética en comercial cerca de net-zero, **fotovoltaica obligatoria** en comercial. Pausa en cambios residenciales hasta mid-2029.

### AS/NZS 1170 · Cargas (sistema armonizado AU + NZ)

| Norma | Objeto |
|---|---|
| **AS/NZS 1170.0:2002** | Bases y combinaciones |
| **AS/NZS 1170.1:2002** | Permanentes y de uso |
| **AS/NZS 1170.2:2021** | Viento (recientemente actualizada) |
| **AS/NZS 1170.3:2003** | Nieve y hielo |
| **AS 1170.4:2007** | Sísmica (solo Australia) |

### Estructurales
- **AS 3600:2018** — Concrete Structures
- **AS 4100:2020** — Steel Structures
- **AS 1720.1:2010 (R2018)** — Timber Structures (incluye CLT)
- **AS 4055:2021** — Cargas viento residencial

### Eficiencia energética y sostenibilidad
- **NCC 2022/2025 J Section** — energy efficiency
- **NatHERS** — rating viviendas (1-10 estrellas)
- **NABERS** — rating ambiental
- **Green Star** (GBC Australia)

### Madera
- **AS 5346:2023** — EIFS
- **Responsible Wood (PEFC)** y FSC Australia
- Mass timber hasta 25 m altura

---

## Chile — OGUC + NCh + DS 60/61

Sistema dual: **OGUC** (administrativo/urbanístico) + **NCh** del **Instituto Nacional de Normalización (INN)**, oficializadas por DS del MINVU.

### Marco maestro

| Norma | Objeto |
|---|---|
| **OGUC** | Ordenanza General de Urbanismo y Construcciones |
| **LGUC** | Ley General de Urbanismo y Construcciones |
| **DS 60/2011 + DS 61/2011 (MINVU)** | Modificaciones post-27F a NCh 430 y NCh 433 |

> **Contexto crítico 27F**: tras el terremoto del 27 febrero 2010 (8.8 Mw), Chile emitió de emergencia los **DS 60 y 61 (2011)** modificando NCh 430 y NCh 433. Siguen vigentes mientras se completa actualización formal (basada en ACI 318-19).

### Sísmica — NCh 433
NCh 433.Of1996 mod. 2009 + DS 61/2011. Todo el territorio se considera elevado riesgo sísmico. Espectro basado en 27F. Clasificación suelos en 6 categorías.

### Hormigón armado — NCh 430
NCh 430.Of2008 + DS 60/2011. Adopta **ACI 318-05** con modificaciones chilenas. En revisión para adoptar ACI 318-19.

### Industrial sismorresistente
- **NCh 2369.Of2003** — diseño sísmico industrial

### Cargas y otras

| Norma | Objeto |
|---|---|
| **NCh 1537.Of2009** | Cargas permanentes y sobrecargas |
| **NCh 431.Of77** | Sobrecargas nieve |
| **NCh 432.Of71** | Acción del viento |
| **NCh 1198.Of2014** | Construcciones madera |
| **NCh 1928.Of93** | Albañilería armada |
| **NCh 2123.Of97** | Albañilería confinada |
| **NCh 427** | Acero (basado en AISC 360) |
| **NCh 3171.Of2017** | Combinaciones de carga |

### Térmica
- **OGUC Art. 4.1.10** — acondicionamiento térmico (zonificación)
- **NCh 853.Of2007** — resistencias térmicas
- **CEV** — Calificación Energética de Viviendas (escala A-G)

### Aislación sísmica
- **NCh 2745.Of2003** — aislación sísmica (común en hospitales y edificios críticos)

---

## Colombia — NSR-10 + Ley 400 + AIS

Sistema centralizado del **Ministerio de Vivienda, Ciudad y Territorio**, con base técnica en **Asociación Colombiana de Ingeniería Sísmica (AIS)** y supervisión por **Curadurías Urbanas**.

### Marco maestro

| Norma | Objeto |
|---|---|
| **Ley 400 de 1997** (mod. Ley 1229/2008) | Marco legal sismorresistente |
| **NSR-10** | Decreto 926 del 19 marzo 2010 |
| **Decreto 945 de 2017** | Última modificación importante: Revisor Independiente y Supervisión Técnica |
| **Ley 1796 de 2016** ("Ley Anti-Space") | Garantías al comprador |

### NSR-10 · Estructura (11 títulos)

| Título | Contenido |
|---|---|
| **A** | Requisitos generales sismorresistentes — mapa amenaza, sistemas, derivas |
| **B** | Cargas — combinaciones, gravitatorias, viento, sismo |
| **C** | **Hormigón estructural** — basado en ACI 318 |
| **D** | Mampostería estructural |
| **E** | Casas uno y dos pisos |
| **F** | Estructuras metálicas — basado en AISC |
| **G** | Madera y guadua |
| **H** | Estudios geotécnicos |
| **I** | Supervisión técnica |
| **J** | Protección contra incendios |
| **K** | Requisitos complementarios |

### Zonas amenaza sísmica
- **Alta** — 39.7% población (553 municipios) — Bogotá, Cali, Pereira, Pasto
- **Intermedia** — 47.3% población (431 municipios) — Medellín, Bucaramanga
- **Baja** — 13% población (139 municipios)

### Documentos AIS complementarios

| Documento | Objeto |
|---|---|
| **AIS 100-24** | Diseño y construcción sismorresistente (4 tomos) |
| **AIS 114-17** | Hormigón reforzado |
| **AIS 180-13** | Estructuras diferentes de edificaciones |
| **AIS 410-23** | Vulnerabilidad sísmica mampostería |
| **AIS 610-EP-17** | Edificaciones patrimoniales adobe/tapia |
| **AIS 701-24** | Edificaciones aisladas sísmicamente |
| **AIS 702-24** | Disipadores de energía |

### Curadurías Urbanas
Revisión planos + cálculos + verificación NSR-10 + emisión licencias.

### Eficiencia energética
- **Resolución 0549 de 2015** — construcción sostenible (agua y energía)
- **Sello Ambiental Colombiano**
- **CASA Colombia**

---

## Mapeo cruzado por familia normativa

### Cargas y combinaciones

| Verificación | España | USA | Australia | Chile | Colombia |
|---|---|---|---|---|---|
| Bases generales | CTE DB-SE | ASCE 7-22 Cap. 1-2 | AS/NZS 1170.0 | NCh 3171 | NSR-10 Título B |
| Cargas uso | DB-SE-AE 3.1 | ASCE 7 Cap. 4 | AS/NZS 1170.1 | NCh 1537 | NSR-10 B.4 |
| Viento | DB-SE-AE 3.3 | ASCE 7 Cap. 26-31 | AS/NZS 1170.2 | NCh 432 | NSR-10 B.6 |
| Nieve | DB-SE-AE 3.5 | ASCE 7 Cap. 7 | AS/NZS 1170.3 | NCh 431 | (cordillera) |
| Sismo | NCSR-02 | ASCE 7 Cap. 11-22 | AS 1170.4 | NCh 433 + DS 61 | NSR-10 Título A |

### Hormigón armado

| Verificación | España | USA / Internacional | Chile | Colombia |
|---|---|---|---|---|
| Norma maestra | EHE-08 | **ACI 318-19** | NCh 430 + DS 60 | NSR-10 Título C |
| ELU flexión | Art. 44 | ACI 318 Cap. 9, 22 | NCh 430 / ACI 318 | NSR-10 C.10, C.22 |
| ELU cortante | Art. 44.2 | ACI 318 Cap. 22.5 | NCh 430 / ACI 318 | NSR-10 C.22.5 |
| Punzonamiento | Art. 46 | ACI 318 Cap. 22.6 | NCh 430 / ACI 318 | NSR-10 C.22.6 |
| ELS flechas | Art. 42 | ACI 318 Cap. 24 | NCh 430 / ACI 318 | NSR-10 C.24 |

### Acero

| Verificación | España | USA | Australia | Chile | Colombia |
|---|---|---|---|---|---|
| Norma maestra | DB-SE-A / EAE | AISC 360-22 | AS 4100:2020 | NCh 427 | NSR-10 Título F |
| Diseño sísmico | NCSR-02 | AISC 341-22 | AS 4100 + AS 1170.4 | NCh 2369 (industrial) | NSR-10 F.3 |

### Madera

| Verificación | España | USA | Australia | Chile | Colombia |
|---|---|---|---|---|---|
| Norma maestra | CTE DB-SE-M / EC5 | NDS 2024 | AS 1720.1 | NCh 1198 | NSR-10 Título G (incluye guadua) |
| CLT | UNE-EN 16351 | APA PRG 320 | AS 1720 + AS 5068 | (en desarrollo) | (en desarrollo) |

### Sostenibilidad

| Verificación | España | USA | Australia | Chile | Colombia |
|---|---|---|---|---|---|
| Eficiencia energética | CTE DB-HE | IECC 2024 / ASHRAE 90.1 | NCC 2025 J | OGUC 4.1.10 + CEV | Resolución 0549/2015 |
| Certificación voluntaria | VERDE / BREEAM ES | LEED / PHIUS / WELL | NABERS / Green Star | LEED / EDGE | LEED / CASA Colombia |

---

## Glosario

| Sigla | Significado |
|---|---|
| **ABCB** | Australian Building Codes Board |
| **ACI** | American Concrete Institute |
| **ACS** | Agua Caliente Sanitaria |
| **AICE** | Asociación de Ingenieros Civiles Estructurales (Chile) |
| **AIS** | Asociación Colombiana de Ingeniería Sísmica |
| **AISC** | American Institute of Steel Construction |
| **ASCE** | American Society of Civil Engineers |
| **ASHRAE** | American Society of Heating, Refrigerating and Air-Conditioning Engineers |
| **BCA** | Building Code of Australia |
| **BIM** | Building Information Modeling |
| **CASA** | Certificación Ambiental Sostenible Aplicada (Colombia) |
| **CBC** | California Building Code |
| **CEV** | Calificación Energética de Viviendas (Chile) |
| **CLT** | Cross Laminated Timber (madera contralaminada) |
| **CTE** | Código Técnico de la Edificación |
| **DB** | Documento Básico del CTE |
| **DS** | Decreto Supremo (Chile) |
| **EHE** | Instrucción Española de Hormigón Estructural |
| **ELS** | Estado Límite de Servicio |
| **ELU** | Estado Límite Último |
| **EPBD** | Energy Performance of Buildings Directive |
| **EPD** | Environmental Product Declaration |
| **FEM** | Finite Element Method |
| **FSC** | Forest Stewardship Council |
| **HIA** | Housing Industry Association (Australia) |
| **IBC** | International Building Code (USA) |
| **ICC** | International Code Council (USA) |
| **IECC** | International Energy Conservation Code (USA) |
| **IFC** | International Fire Code (USA) |
| **INN** | Instituto Nacional de Normalización (Chile) |
| **LOE** | Ley de Ordenación de la Edificación |
| **MINVU** | Ministerio de Vivienda y Urbanismo (Chile) |
| **MVHR** | Mechanical Ventilation with Heat Recovery |
| **NABERS** | National Australian Built Environment Rating System |
| **NatHERS** | Nationwide House Energy Rating Scheme |
| **NCC** | National Construction Code (Australia) |
| **NCh** | Norma Chilena |
| **NCSR** | Norma de Construcción Sismorresistente |
| **NDS** | National Design Specification for Wood Construction (USA) |
| **NSR** | Norma Sismo Resistente (Colombia) |
| **OGUC** | Ordenanza General de Urbanismo y Construcciones (Chile) |
| **PCA** | Plumbing Code of Australia |
| **PCI** | Protección Contra Incendios |
| **PEFC** | Programme for the Endorsement of Forest Certification |
| **PGOU** | Plan General de Ordenación Urbana |
| **PHIUS** | Passive House Institute US |
| **RITE** | Reglamento de Instalaciones Térmicas en los Edificios |

---

## ¿Cómo lo verifica STRUXAI?

El agente estructural de STRUXAI lee el **modelo analítico de Revit**, identifica la jurisdicción del proyecto y mapea cada elemento (pilar, viga, forjado) contra el conjunto normativo aplicable. Lanza el cálculo en el motor FEM que prefieras (CYPE, Robot, SAP2000, ETABS, OpenSees, Tricalc) y devuelve un dashboard con estado por elemento: **CUMPLE / PTE / FALLO**.

| Jurisdicción | Normativa aplicable |
|---|---|
| España | CTE + EHE-08 + NCSR-02 + Eurocódigos |
| USA | IBC + ASCE 7 + ACI 318 / AISC 360 / NDS |
| Australia | NCC + AS/NZS 1170 + AS 3600 / 4100 / 1720 |
| Chile | OGUC + NCh 430/433 + DS 60/61 |
| Colombia | NSR-10 (Títulos A-K) + AIS |

Trazable, firmable, sin spreadsheets. La memoria de cálculo la firma el ingeniero — STRUXAI le devuelve el tiempo.

---

*Documento vivo. Última revisión: abril 2026.*

**STRUXAI** — Cálculo estructural más rápido. Cumplimiento garantizado.

[github.com/nexusfinlabs/struxai-docs](https://github.com/nexusfinlabs/struxai-docs)


---

---

<br><br>

# 🇬🇧 ENGLISH VERSION

The full content above is also available in English below.

---

# STRUXAI · Applicable Regulations

> **Complete regulatory framework for the calculation, verification and sustainable construction of buildings.** This document compiles the regulations that STRUXAI automatically verifies on every analytical model extracted from Revit. Covers Spain, United States, Australia, Chile and Colombia.

---

## Table of contents

1. Spain — Base legal framework
2. Spain — Technical Building Code (CTE)
3. Spain — Concrete EHE-08
4. Spain — Timber and CLT
5. Spain — Seismic NCSR-02
6. Spain — Eurocodes
7. Spain — Thermal installations and renewables
8. Spain — Sustainability
9. International — Comparative summary
10. USA — IBC + ASCE 7 + ACI 318
11. Australia — NCC + AS/NZS
12. Chile — OGUC + NCh + DS 60/61
13. Colombia — NSR-10 + Law 400 + AIS
14. Cross-mapping by regulatory family
15. Glossary
16. How does STRUXAI verify it?

---

# SPAIN

## Spain — Base legal framework

| Standard | Year | Scope | Mandatory |
|---|---|---|---|
| **LOE** — Building Code Act | 1999 | Requires architect's project, building permit, technical direction and **10-year Decennial Insurance** | Mandatory in every building project |
| **PGOU** — General Urban Planning Plan | Variable | Municipal rules on land, volume, height and permitted use | Mandatory per municipality |
| **Regional Land Acts** | Variable | Regional regulation on zoning and uses | Mandatory per Autonomous Community |

---

## Spain — Technical Building Code (CTE)

The **base** regulation that sets the minimum requirements for every building in Spain. Structured into Basic Documents (DB) organized by performance requirement.

### DB-SE · Structural Safety

| Article | Subject | STRUXAI verifies |
|---|---|---|
| **DB-SE** general | Structural safety principles | Global equilibrium, resistance, serviceability |
| **DB-SE-AE** | Actions on buildings | Imposed loads (Art. 3.1), wind (Art. 3.3), snow, thermal |
| **DB-SE-C** | Foundations | Bearing capacity, settlements, sliding |
| **DB-SE-A** | Structural steel | Strength, buckling, bolted and welded connections |
| **DB-SE-F** | Masonry (load-bearing walls) | Compression and bending-compression strength |
| **DB-SE-M** | Structural timber | Properties, ULS, SLS, fire resistance |
| **DB-SE Art. 4.3.3** | Admissible deformations | Deflection L/250 on cantilevers, L/400 on beams |

### DB-SI · Fire Safety

| Article | Typical application |
|---|---|
| **DB-SI 1** | Internal propagation (fire compartments) |
| **DB-SI 2** | External propagation (facades, party walls) |
| **DB-SI 3** | Occupant evacuation |
| **DB-SI 4** | Fire protection installations |
| **DB-SI 5** | Firefighter intervention |
| **DB-SI 6** | Structural fire resistance (R60, R90, R120) |

### DB-SUA · Safety in Use and Accessibility

| Article | Subject |
|---|---|
| **DB-SUA 1** | Fall protection: railings Q ≥ 1.6 kN/m, anti-slip flooring |
| **DB-SUA 2** | Impact and entrapment risk |
| **DB-SUA 9** | Accessibility: ramps, lifts, passage width |

### DB-HE · Energy Saving

| Article | Application |
|---|---|
| **DB-HE 0** | Limitation of non-renewable primary energy consumption |
| **DB-HE 1** | Energy demand limitation (envelope) |
| **DB-HE 4** | Minimum solar contribution for DHW |
| **DB-HE 5** | Minimum photovoltaic contribution |

### DB-HR · Noise Protection
Sets minimum acoustic insulation against airborne and impact noise.

### DB-HS · Health

| Article | Subject |
|---|---|
| **DB-HS 1** | Moisture protection |
| **DB-HS 3** | Indoor air quality (ventilation) |

---

## Spain — Concrete EHE-08

**Spanish Structural Concrete Code (2008).** Mandatory for buildings with reinforced or prestressed concrete structures.

### Serviceability Limit States (SLS)

| Article | Verification |
|---|---|
| **Art. 42** | Active and total deflections — limit L/250 cantilevers, L/400 beams |
| **Art. 49** | Cracking — maximum width by exposure class |

### Ultimate Limit States (ULS)

| Article | Verification |
|---|---|
| **Art. 44** | Simple and combined bending |
| **Art. 44.2** | Shear and longitudinal shear |
| **Art. 46** | **Punching shear** in solid slabs |
| **Art. 49** | Buckling of slender columns |
| **Art. 50** | Combined compression in columns |

### Exposure classes and durability
Each element is classified by environment (I, IIa, IIb, IIIa, IIIb, IIIc, IV, Qa/b/c). STRUXAI maps this to the minimum cover and required reinforcement.

---

## Spain — Timber and CLT

### CTE DB-SE-M · Spanish mandatory standard
Regulates the design and safety of timber structures: properties by strength class (C14–C30 sawn timber, GL20h–GL32h glulam), modification factors, joints, fire resistance.

### Eurocode 5 (EN 1995-1-1)
European advanced design standard. Widely used for **CLT (Cross Laminated Timber)** and complex joints.

### Certified products (CE marking)

| Standard | Product |
|---|---|
| **UNE-EN 16351** | CLT panels |
| **UNE-EN 14081** | Sawn structural timber |
| **UNE-EN 14080** | Glued laminated timber (Glulam) |
| **UNE-EN 14374** | LVL (Laminated Veneer Lumber) |
| **UNE-EN 1912** | Strength class assignment |

---

## Spain — Seismic NCSR-02

**Earthquake-Resistant Construction Standard (2002).**

### Seismic zones
- **Zone A** — ab < 0.04 g: voluntary
- **Zone B** — 0.04 g ≤ ab < 0.12 g: mandatory in high-occupancy buildings
- **Zone C** — 0.12 g ≤ ab < 0.16 g: mandatory
- **Zone D** — ab ≥ 0.16 g: mandatory in all buildings

### Typical verifications
- Modal spectral or simplified analysis
- Accidental torsion and P-Δ effects
- Ductility and energy dissipation
- Maximum interstory drift

---

## Spain — Eurocodes

| Eurocode | Subject |
|---|---|
| **EN 1990** | Basis of structural design |
| **EN 1991** | Actions on structures |
| **EN 1992** | Concrete structures |
| **EN 1993** | Steel structures |
| **EN 1994** | Composite steel-concrete structures |
| **EN 1995** | Timber structures (includes CLT) |
| **EN 1996** | Masonry structures |
| **EN 1997** | Geotechnical design |
| **EN 1998** | Seismic design |
| **EN 1999** | Aluminum structures |

---

## Spain — Thermal installations and renewables

### RITE (RD 1027/2007)
Regulation on Thermal Installations. Mandatory for heating, air conditioning and DHW.

### Biomass

| Standard | Subject |
|---|---|
| **UNE-EN 303-5** | Biomass boilers — classes 3, 4, 5 |
| **RD 413/2014** | Renewable energy production |
| **ENplus A1 / A2** | Pellet certification |
| **UNE-EN 14961** | Solid biofuels |

### Photovoltaic self-consumption

| Standard | Subject |
|---|---|
| **RD 244/2019** | Individual and shared self-consumption |
| **RD 900/2015** | Administrative conditions |
| **UNE-EN 61215** | Crystalline photovoltaic modules |
| **IEC 62446-1** | PV inspection and commissioning |

### Passivhaus
Heating demand < 15 kWh/m²·year, airtightness n50 ≤ 0.6 h⁻¹. Certified by Passivhaus Institut (Darmstadt) and Instituto Passivhaus in Spain.

---

## Spain — Sustainability

### European directives
- **EPBD 2030** — all new buildings **Zero Emission** from 2030 (2027 for public buildings)
- **EU Taxonomy** — sustainable activities classification
- **EU Green Deal** — climate neutrality by 2050

### Life Cycle Assessment (LCA)
- **UNE-EN 15978** — environmental performance
- **EPD** — verified environmental declaration
- Embodied carbon footprint

### Certified timber
- **FSC** — Forest Stewardship Council
- **PEFC** — Programme for the Endorsement of Forest Certification
- **EU Timber Regulation (EUTR)** — illegal timber prohibition

### Voluntary certifications
- LEED (USGBC, USA)
- BREEAM (UK)
- VERDE (Green Building Council Spain)
- DGNB (Germany)

---

# INTERNATIONAL

## International — Comparative summary

| Country | Master code | Actions | Concrete | Steel | Timber | Seismic |
|---|---|---|---|---|---|---|
| **Spain** | CTE | DB-SE-AE | EHE-08 | DB-SE-A / EAE | DB-SE-M | NCSR-02 |
| **USA** | IBC 2024 | ASCE 7-22 | ACI 318-19 | AISC 360-22 | NDS 2024 | ASCE 7-22 + ASCE 41-23 |
| **Australia** | NCC 2025 | AS/NZS 1170 | AS 3600:2018 | AS 4100:2020 | AS 1720.1 | AS 1170.4-2007 |
| **Chile** | OGUC | NCh 1537 / 432 | NCh 430 + DS 60 | NCh 427 | NCh 1198 | NCh 433 + DS 61 |
| **Colombia** | NSR-10 | Title B | Title C (ACI 318) | Title F | Title G | Title A |

**Key observation**: three of five countries (USA, Chile, Colombia) take ACI 318 as the concrete base and AISC 360 as the steel base. Australia maintains its own AS/NZS system harmonized with New Zealand.

---

## USA — IBC + ASCE 7 + ACI 318

The USA has no federal building code. The **International Code Council (ICC)** publishes model codes every 3 years; each state/county adopts them independently.

### Master code

| Code | Current edition | Application |
|---|---|---|
| **IBC 2024** | States adopting 2025–2027 | Commercial, multi-family and public buildings |
| **IRC 2024** | Adopted | Single and two-family housing up to 3 stories |
| **IECC 2024** | Adopted | Energy efficiency |
| **IFC 2024** | Adopted | Fire protection |
| **CBC 2022** | California (based on IBC 2021) | California state amendments |

> **IBC 2024 highlight**: for the first time includes **tornado load design** (Chapter 32) aligned with ASCE 7-22. Extends mass timber Type IV-A/B/C up to 18 stories.

### ASCE 7-22 · Loads

| Edition | Status |
|---|---|
| **ASCE 7-22** | Current with IBC 2024. Includes tornado loads (WT) for the first time |
| ASCE 7-16 | Current in jurisdictions with IBC 2018/2021 |
| ASCE 41-23 | Seismic evaluation of existing buildings |

### ACI 318-19 · Concrete

| Chapter | Subject |
|---|---|
| **Ch. 5** | Loads and combinations |
| **Ch. 7-9** | One-way and two-way slabs |
| **Ch. 10** | Beams and bending elements |
| **Ch. 18** | Special seismic design (Special Moment Frames) |
| **Ch. 22** | Shear (includes punching — equivalent to EHE Art. 46) |

### AISC 360-22 · Steel
Covers LRFD and ASD. Companion standards: **AISC 341-22** (seismic), **AISC 358-22** (prequalified connections).

### Timber and mass timber
- **NDS 2024** — National Design Specification for Wood Construction
- **APA PRG 320** — CLT panels
- IBC 2024 recognizes mass timber Type IV-A/B/C up to 18 stories

### Energy efficiency
- **ASHRAE 90.1-2022** — Energy Standard for Buildings
- **IECC 2024** — Continuous insulation, mandatory blower door

### Voluntary certifications
LEED v4.1 · Living Building Challenge · WELL · Passive House (PHIUS)

---

## Australia — NCC + AS/NZS

Federal system coordinated by the **Australian Building Codes Board (ABCB)**.

### Master code

| Volume | Content |
|---|---|
| **Volume 1 (BCA)** | Class 2-9 buildings |
| **Volume 2 (BCA)** | Class 1 and 10 (housing, garages) |
| **Volume 3 (PCA)** | Plumbing Code of Australia |

> **NCC 2025** preview published on 1 February 2026, optional adoption from 1 May 2026. Main changes: water management, fire in car parks, energy efficiency in commercial close to net-zero, **mandatory photovoltaics** in commercial. Pause in residential changes until mid-2029.

### AS/NZS 1170 · Loads (harmonized AU + NZ system)

| Standard | Subject |
|---|---|
| **AS/NZS 1170.0:2002** | Basis and combinations |
| **AS/NZS 1170.1:2002** | Permanent and imposed loads |
| **AS/NZS 1170.2:2021** | Wind (recently updated) |
| **AS/NZS 1170.3:2003** | Snow and ice |
| **AS 1170.4:2007** | Seismic (Australia only) |

### Structural standards
- **AS 3600:2018** — Concrete Structures
- **AS 4100:2020** — Steel Structures
- **AS 1720.1:2010 (R2018)** — Timber Structures (includes CLT)
- **AS 4055:2021** — Residential wind loads

### Energy efficiency and sustainability
- **NCC 2022/2025 J Section** — energy efficiency
- **NatHERS** — housing rating (1-10 stars)
- **NABERS** — environmental rating
- **Green Star** (GBC Australia)

### Timber
- **AS 5346:2023** — EIFS
- **Responsible Wood (PEFC)** and FSC Australia
- Mass timber up to 25 m height

---

## Chile — OGUC + NCh + DS 60/61

Dual system: **OGUC** (administrative/urban) + **NCh** issued by the **National Standardization Institute (INN)**, made official by Supreme Decrees from MINVU.

### Master framework

| Standard | Subject |
|---|---|
| **OGUC** | General Ordinance on Urbanism and Construction |
| **LGUC** | General Law on Urbanism and Construction |
| **DS 60/2011 + DS 61/2011 (MINVU)** | Post-27F amendments to NCh 430 and NCh 433 |

> **Critical 27F context**: after the 27 February 2010 earthquake (8.8 Mw), Chile issued emergency **DS 60 and 61 (2011)** modifying NCh 430 and NCh 433. They remain in force while formal updates are completed (based on ACI 318-19).

### Seismic — NCh 433
NCh 433.Of1996 mod. 2009 + DS 61/2011. The entire territory is considered high seismic risk. Spectrum based on 27F. Soil classification in 6 categories.

### Reinforced concrete — NCh 430
NCh 430.Of2008 + DS 60/2011. Adopts **ACI 318-05** with Chilean modifications. Under review to adopt ACI 318-19.

### Industrial earthquake-resistant
- **NCh 2369.Of2003** — industrial seismic design

### Loads and others

| Standard | Subject |
|---|---|
| **NCh 1537.Of2009** | Permanent and imposed loads |
| **NCh 431.Of77** | Snow loads |
| **NCh 432.Of71** | Wind action |
| **NCh 1198.Of2014** | Timber construction |
| **NCh 1928.Of93** | Reinforced masonry |
| **NCh 2123.Of97** | Confined masonry |
| **NCh 427** | Steel (based on AISC 360) |
| **NCh 3171.Of2017** | Load combinations |

### Thermal
- **OGUC Art. 4.1.10** — thermal conditioning (zoning)
- **NCh 853.Of2007** — thermal resistance
- **CEV** — Housing Energy Rating (A-G scale)

### Seismic isolation
- **NCh 2745.Of2003** — seismic isolation (common in hospitals and critical buildings)

---

## Colombia — NSR-10 + Law 400 + AIS

Centralized system from the **Ministry of Housing, City and Territory**, with technical basis from the **Colombian Association of Earthquake Engineering (AIS)** and supervision by **Urban Curatorships**.

### Master framework

| Standard | Subject |
|---|---|
| **Law 400 of 1997** (mod. Law 1229/2008) | Earthquake-resistant legal framework |
| **NSR-10** | Decree 926 of 19 March 2010 |
| **Decree 945 of 2017** | Latest major amendment: Independent Reviewer and Technical Supervision |
| **Law 1796 of 2016** ("Anti-Space Law") | Buyer guarantees |

### NSR-10 · Structure (11 titles)

| Title | Content |
|---|---|
| **A** | General earthquake-resistant requirements — hazard map, systems, drifts |
| **B** | Loads — combinations, gravity, wind, seismic |
| **C** | **Structural concrete** — based on ACI 318 |
| **D** | Structural masonry |
| **E** | One and two-story houses |
| **F** | Steel structures — based on AISC |
| **G** | Timber and bamboo (guadua) |
| **H** | Geotechnical studies |
| **I** | Technical supervision |
| **J** | Fire protection |
| **K** | Complementary requirements |

### Seismic hazard zones
- **High** — 39.7% of population (553 municipalities) — Bogotá, Cali, Pereira, Pasto
- **Intermediate** — 47.3% of population (431 municipalities) — Medellín, Bucaramanga
- **Low** — 13% of population (139 municipalities)

### Complementary AIS documents

| Document | Subject |
|---|---|
| **AIS 100-24** | Earthquake-resistant design and construction (4 volumes) |
| **AIS 114-17** | Reinforced concrete |
| **AIS 180-13** | Structures other than buildings |
| **AIS 410-23** | Masonry seismic vulnerability |
| **AIS 610-EP-17** | Heritage adobe/rammed earth buildings |
| **AIS 701-24** | Seismically isolated buildings |
| **AIS 702-24** | Energy dissipators |

### Urban Curatorships
Plan and calculation review + NSR-10 verification + permit issuance.

### Energy efficiency
- **Resolution 0549 of 2015** — sustainable construction (water and energy)
- **Colombian Environmental Seal**
- **CASA Colombia**

---

## Cross-mapping by regulatory family

### Loads and combinations

| Verification | Spain | USA | Australia | Chile | Colombia |
|---|---|---|---|---|---|
| General basis | CTE DB-SE | ASCE 7-22 Ch. 1-2 | AS/NZS 1170.0 | NCh 3171 | NSR-10 Title B |
| Imposed loads | DB-SE-AE 3.1 | ASCE 7 Ch. 4 | AS/NZS 1170.1 | NCh 1537 | NSR-10 B.4 |
| Wind | DB-SE-AE 3.3 | ASCE 7 Ch. 26-31 | AS/NZS 1170.2 | NCh 432 | NSR-10 B.6 |
| Snow | DB-SE-AE 3.5 | ASCE 7 Ch. 7 | AS/NZS 1170.3 | NCh 431 | (mountains only) |
| Seismic | NCSR-02 | ASCE 7 Ch. 11-22 | AS 1170.4 | NCh 433 + DS 61 | NSR-10 Title A |

### Reinforced concrete

| Verification | Spain | USA / International | Chile | Colombia |
|---|---|---|---|---|
| Master standard | EHE-08 | **ACI 318-19** | NCh 430 + DS 60 | NSR-10 Title C |
| ULS bending | Art. 44 | ACI 318 Ch. 9, 22 | NCh 430 / ACI 318 | NSR-10 C.10, C.22 |
| ULS shear | Art. 44.2 | ACI 318 Ch. 22.5 | NCh 430 / ACI 318 | NSR-10 C.22.5 |
| Punching shear | Art. 46 | ACI 318 Ch. 22.6 | NCh 430 / ACI 318 | NSR-10 C.22.6 |
| SLS deflections | Art. 42 | ACI 318 Ch. 24 | NCh 430 / ACI 318 | NSR-10 C.24 |

### Steel

| Verification | Spain | USA | Australia | Chile | Colombia |
|---|---|---|---|---|---|
| Master standard | DB-SE-A / EAE | AISC 360-22 | AS 4100:2020 | NCh 427 | NSR-10 Title F |
| Seismic design | NCSR-02 | AISC 341-22 | AS 4100 + AS 1170.4 | NCh 2369 (industrial) | NSR-10 F.3 |

### Timber

| Verification | Spain | USA | Australia | Chile | Colombia |
|---|---|---|---|---|---|
| Master standard | CTE DB-SE-M / EC5 | NDS 2024 | AS 1720.1 | NCh 1198 | NSR-10 Title G (includes guadua) |
| CLT | UNE-EN 16351 | APA PRG 320 | AS 1720 + AS 5068 | (in development) | (in development) |

### Sustainability

| Verification | Spain | USA | Australia | Chile | Colombia |
|---|---|---|---|---|---|
| Energy efficiency | CTE DB-HE | IECC 2024 / ASHRAE 90.1 | NCC 2025 J | OGUC 4.1.10 + CEV | Resolution 0549/2015 |
| Voluntary certification | VERDE / BREEAM ES | LEED / PHIUS / WELL | NABERS / Green Star | LEED / EDGE | LEED / CASA Colombia |

---

## Glossary

| Acronym | Meaning |
|---|---|
| **ABCB** | Australian Building Codes Board |
| **ACI** | American Concrete Institute |
| **AICE** | Association of Civil Structural Engineers (Chile) |
| **AIS** | Colombian Association of Earthquake Engineering |
| **AISC** | American Institute of Steel Construction |
| **ASCE** | American Society of Civil Engineers |
| **ASHRAE** | American Society of Heating, Refrigerating and Air-Conditioning Engineers |
| **BCA** | Building Code of Australia |
| **BIM** | Building Information Modeling |
| **CASA** | Applied Sustainable Environmental Certification (Colombia) |
| **CBC** | California Building Code |
| **CEV** | Housing Energy Rating (Chile) |
| **CLT** | Cross Laminated Timber |
| **CTE** | Spanish Technical Building Code |
| **DB** | Basic Document of CTE |
| **DHW** | Domestic Hot Water |
| **DS** | Supreme Decree (Chile) |
| **EHE** | Spanish Structural Concrete Instruction |
| **EPBD** | Energy Performance of Buildings Directive |
| **EPD** | Environmental Product Declaration |
| **FEM** | Finite Element Method |
| **FSC** | Forest Stewardship Council |
| **HIA** | Housing Industry Association (Australia) |
| **IBC** | International Building Code (USA) |
| **ICC** | International Code Council (USA) |
| **IECC** | International Energy Conservation Code (USA) |
| **IFC** | International Fire Code (USA) |
| **INN** | National Standardization Institute (Chile) |
| **LCA** | Life Cycle Assessment |
| **LOE** | Spanish Building Code Act |
| **MINVU** | Ministry of Housing and Urbanism (Chile) |
| **MVHR** | Mechanical Ventilation with Heat Recovery |
| **NABERS** | National Australian Built Environment Rating System |
| **NatHERS** | Nationwide House Energy Rating Scheme |
| **NCC** | National Construction Code (Australia) |
| **NCh** | Chilean Standard |
| **NCSR** | Earthquake-Resistant Construction Standard (Spain) |
| **NDS** | National Design Specification for Wood Construction (USA) |
| **NSR** | Seismic Resistant Standard (Colombia) |
| **OGUC** | General Ordinance on Urbanism and Construction (Chile) |
| **PCA** | Plumbing Code of Australia |
| **PEFC** | Programme for the Endorsement of Forest Certification |
| **PGOU** | General Urban Planning Plan (Spain) |
| **PHIUS** | Passive House Institute US |
| **RITE** | Regulation on Thermal Installations in Buildings (Spain) |
| **SLS** | Serviceability Limit State |
| **ULS** | Ultimate Limit State |

---

## How does STRUXAI verify it?

The STRUXAI structural agent reads the **Revit analytical model**, identifies the project jurisdiction and maps each element (column, beam, slab) against the applicable regulatory set. It triggers the calculation in your preferred FEM engine (CYPE, Robot, SAP2000, ETABS, OpenSees, Tricalc) and returns a dashboard with status by element: **PASS / PENDING / FAIL**.

| Jurisdiction | Applicable regulations |
|---|---|
| Spain | CTE + EHE-08 + NCSR-02 + Eurocodes |
| USA | IBC + ASCE 7 + ACI 318 / AISC 360 / NDS |
| Australia | NCC + AS/NZS 1170 + AS 3600 / 4100 / 1720 |
| Chile | OGUC + NCh 430/433 + DS 60/61 |
| Colombia | NSR-10 (Titles A-K) + AIS |

Traceable, signable, no spreadsheets. The calculation report is signed by the engineer — STRUXAI gives back the time.

---

*Living document. Last revision: April 2026.*

**STRUXAI** — Faster structural calculation. Guaranteed compliance.

[github.com/nexusfinlabs/struxai-docs](https://github.com/nexusfinlabs/struxai-docs)
