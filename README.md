# Natal Spot

Landing page estatica pronta para publicacao no GitHub Pages com dominio customizado.

## Publicacao no GitHub Pages

1. Suba o conteudo para o branch principal do repositorio.
2. No GitHub: Settings > Pages.
3. Em Build and deployment:
Source: Deploy from a branch
Branch: main
Folder: / (root)
4. Salve e aguarde a URL do Pages ficar ativa.

## Dominio Customizado

O projeto ja inclui:

- CNAME apontando para natalspot.com.br
- robots.txt com sitemap do dominio correto
- sitemap.xml com URL canonica correta

Registros DNS recomendados:

- CNAME do subdominio www para <usuario>.github.io
- A/ALIAS do dominio raiz para os IPs do GitHub Pages

## Checklist de Seguranca

- CSP via meta tag no head
- Referrer-Policy definida
- Links externos com target="_blank" usando rel="noopener noreferrer"
- HTTPS forcado via upgrade-insecure-requests e block-all-mixed-content
- Sem scripts externos de terceiros

## Branding

Referencias atualizadas para Natal Spot no conteudo principal, metadados de SEO e compartilhamento social.
