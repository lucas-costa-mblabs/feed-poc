import { useEffect, useRef, useState } from 'react'

type Variant = {
  scenario: string
  rendered_content: string | null
  rendered_content_grid: string | null
  content_error?: string
  content_grid_error?: string
}

type TemplateItem = {
  template_id: string
  name: string
  slug: string
  description: string
  variant_count: number
  variants: Variant[]
}

type TemplatesPayload = {
  templates: TemplateItem[]
}

function buildPreviewDocument(rawHtml: string): string {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
  <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css" />
  <style>
    body { margin: 0; padding: 16px; background: #f5f7fb; display: flex; justify-content: center; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
    img, video { max-width: 100%; display: block; }
    .swiper { position: relative; width: 100%; overflow: hidden; }
    .swiper-wrapper { display: flex; width: 100%; transition: transform 280ms ease; }
    .swiper-slide { flex: 0 0 100%; min-width: 100%; }
    .swiper-button-prev, .swiper-button-next {
      position: absolute; top: 50%; transform: translateY(-50%); z-index: 20;
      width: 28px; height: 28px; border-radius: 999px; background: rgba(0,0,0,0.55);
      color: #fff; display: flex; align-items: center; justify-content: center;
      cursor: pointer; user-select: none; font-size: 14px; line-height: 1;
    }
    .swiper-button-prev { left: 8px; }
    .swiper-button-next { right: 8px; }
    .swiper-pagination {
      position: absolute; left: 0; right: 0; bottom: 8px; z-index: 20;
      display: flex; justify-content: center; gap: 6px;
    }
    .swiper-pagination-bullet {
      width: 7px; height: 7px; border-radius: 999px;
      background: rgba(255,255,255,0.45); border: 1px solid rgba(0,0,0,0.2);
    }
    .swiper-pagination-bullet.active { background: #fff; border-color: rgba(0,0,0,0.35); }
  </style>
</head>
<body>${rawHtml}
  <script>
    (function () {
      const swipers = document.querySelectorAll('.swiper');
      swipers.forEach((swiper) => {
        const wrapper = swiper.querySelector('.swiper-wrapper');
        if (!wrapper) return;
        const slides = Array.from(wrapper.children).filter((el) => el.classList.contains('swiper-slide'));
        if (slides.length === 0) return;
        let index = 0;
        const prevBtn = swiper.querySelector('.swiper-button-prev');
        const nextBtn = swiper.querySelector('.swiper-button-next');
        const pagination = swiper.querySelector('.swiper-pagination');
        const update = () => {
          wrapper.style.transform = 'translateX(-' + (index * 100) + '%)';
          if (pagination) {
            const bullets = pagination.querySelectorAll('.swiper-pagination-bullet');
            bullets.forEach((bullet, i) => bullet.classList.toggle('active', i === index));
          }
        };
        if (pagination) {
          pagination.innerHTML = '';
          slides.forEach((_, i) => {
            const bullet = document.createElement('button');
            bullet.type = 'button';
            bullet.className = 'swiper-pagination-bullet' + (i === 0 ? ' active' : '');
            bullet.addEventListener('click', (event) => { event.stopPropagation(); index = i; update(); });
            pagination.appendChild(bullet);
          });
        }
        const hasMany = slides.length > 1;
        if (prevBtn) {
          prevBtn.style.display = hasMany ? 'flex' : 'none';
          prevBtn.innerHTML = '&#10094;';
          prevBtn.addEventListener('click', (event) => { event.stopPropagation(); index = (index - 1 + slides.length) % slides.length; update(); });
        }
        if (nextBtn) {
          nextBtn.style.display = hasMany ? 'flex' : 'none';
          nextBtn.innerHTML = '&#10095;';
          nextBtn.addEventListener('click', (event) => { event.stopPropagation(); index = (index + 1) % slides.length; update(); });
        }
        update();
      });
    })();
  </script>
</body>
</html>`
}

function preparePreviewHtml(value: string | null): string | null {
  if (!value) return null
  const html = value.replace(/\s+on[a-z-]+="[^"]*"/gi, '')
  return buildPreviewDocument(html)
}

function getDefaultVariant(template: TemplateItem): Variant | null {
  if (template.variants.length === 0) return null
  return template.variants.find((v) => v.scenario === 'default') ?? template.variants[0]
}

export default function Templates() {
  const [templates, setTemplates] = useState<TemplateItem[]>([])
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/rendered-templates.json')
        if (!response.ok) {
          throw new Error(`Falha ao carregar templates (${response.status}). Rode: npm run render:templates no templates-poc.`)
        }
        const payload = (await response.json()) as TemplatesPayload
        setTemplates(payload.templates ?? [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro inesperado ao carregar templates')
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [])

  const selectedTemplate = templates.find((t) => t.template_id === selectedTemplateId) ?? null
  const variantsSectionRef = useRef<HTMLElement>(null)

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemplateId(e.target.value)
    if (e.target.value) {
      setTimeout(() => variantsSectionRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
    }
  }

  return (
    <main style={{ width: '100%', padding: 24, height: '100vh', overflowY: 'auto', boxSizing: 'border-box' }}>
      <header style={{ marginBottom: 8 }}>
        <h1 style={{ margin: 0, fontSize: '2rem' }}>Preview de Templates</h1>
        <p style={{ margin: '6px 0 0', color: '#5a6472' }}>Visão default de todos os templates e variantes sob demanda.</p>
      </header>

      {loading && <p style={{ margin: '18px 0' }}>Carregando templates...</p>}
      {error && <p style={{ margin: '18px 0', color: '#c53030' }}>{error}</p>}

      {templates.length > 0 && (
        <div style={{ marginTop: 16, display: 'grid', gap: 6, maxWidth: 540 }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#445268' }} htmlFor="template-select">Template</label>
          <select
            id="template-select"
            value={selectedTemplateId}
            onChange={handleSelectChange}
            style={{ height: 38, border: '1px solid #c8d2e2', borderRadius: 8, padding: '0 10px', background: '#fff', color: '#1d2735' }}
          >
            <option value="">Somente defaults (nenhuma variante expandida)</option>
            {templates.map((t) => (
              <option key={t.template_id} value={t.template_id}>
                {t.name} ({t.slug})
              </option>
            ))}
          </select>
        </div>
      )}

      <section style={{ marginTop: 24, display: 'grid', gap: 18 }}>
        {templates.map((template) => {
          const def = getDefaultVariant(template)
          const content = preparePreviewHtml(def?.rendered_content ?? null)
          const contentGrid = preparePreviewHtml(def?.rendered_content_grid ?? null)
          return (
            <article key={`${template.template_id}-default`} style={{ background: '#fff', border: '1px solid #dce1ea', borderRadius: 12, padding: 14 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1rem' }}>{template.name}</h2>
                <p style={{ margin: '4px 0 0', color: '#667185', fontSize: '0.9rem' }}>slug: {template.slug} | default</p>
              </div>
              <div style={{ marginTop: 12, display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
                <PreviewBlock label="content" html={content} error={def?.content_error} title={`${template.slug}-default-content`} />
                <PreviewBlock label="content_grid" html={contentGrid} error={def?.content_grid_error} title={`${template.slug}-default-content-grid`} />
              </div>
            </article>
          )
        })}
      </section>

      {selectedTemplate && (
        <section ref={variantsSectionRef} style={{ marginTop: 24, display: 'grid', gap: 18 }}>
          <article style={{ background: '#fff', border: '1px solid #dce1ea', borderRadius: 12, padding: 14 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1rem' }}>{selectedTemplate.name}</h2>
              <p style={{ margin: '4px 0 0', color: '#667185', fontSize: '0.9rem' }}>
                slug: {selectedTemplate.slug} | variantes: {selectedTemplate.variant_count} (expandido)
              </p>
            </div>
            <div style={{ marginTop: 12, display: 'grid', gap: 16 }}>
              {selectedTemplate.variants.map((variant, i) => {
                const content = preparePreviewHtml(variant.rendered_content)
                const contentGrid = preparePreviewHtml(variant.rendered_content_grid)
                return (
                  <section key={`${selectedTemplate.template_id}-${i}-${variant.scenario}`} style={{ border: '1px dashed #d6deea', borderRadius: 10, padding: 10, background: '#fbfcfe' }}>
                    <h3 style={{ margin: 0, fontSize: '0.95rem', color: '#2c3e57' }}>cenário: {variant.scenario}</h3>
                    <div style={{ marginTop: 12, display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
                      <PreviewBlock label="content" html={content} error={variant.content_error} title={`${selectedTemplate.slug}-${variant.scenario}-content`} />
                      <PreviewBlock label="content_grid" html={contentGrid} error={variant.content_grid_error} title={`${selectedTemplate.slug}-${variant.scenario}-content-grid`} />
                    </div>
                  </section>
                )
              })}
            </div>
          </article>
        </section>
      )}
    </main>
  )
}

function PreviewBlock({ label, html, error, title }: { label: string; html: string | null; error?: string; title: string }) {
  return (
    <div>
      <h4 style={{ margin: '0 0 8px', fontSize: '0.85rem', color: '#445268', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{label}</h4>
      {error ? (
        <p style={{ margin: 0, padding: 12, border: '1px solid #efb4b4', borderRadius: 8, background: '#fff3f3', color: '#9f1f1f', fontSize: '0.9rem' }}>Erro: {error}</p>
      ) : html ? (
        <iframe style={{ width: '100%', minHeight: 860, border: '1px solid #e0e6ef', borderRadius: 10, background: '#eef2f7' }} srcDoc={html} title={title} sandbox="allow-scripts" />
      ) : (
        <p style={{ margin: 0, padding: 12, border: '1px solid #dbe2ee', borderRadius: 8, background: '#f7f9fd', color: '#5a6472', fontSize: '0.9rem' }}>Não existe neste template.</p>
      )}
    </div>
  )
}
