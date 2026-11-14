const IMAGEN_PLACEHOLDER = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22240%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%231e293b%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%3EImagen%20no%20disponible%3C%2Ftext%3E%3C%2Fsvg%3E'

export default function RecursoCard({ item, onVerDetalle }) {
  const porcentaje = Math.min(Number(item.porcentaje_avance) || 0, 100)
  const metaFormateada = Number(item.meta_financiera).toLocaleString('es-MX', { minimumFractionDigits: 2 })
  const recaudadoFormateado = Number(item.monto_recaudado).toLocaleString('es-MX', { minimumFractionDigits: 2 })

  const estadoClase = {
    activo: 'badge-activo',
    financiado: 'badge-financiado',
    borrador: 'badge-borrador'
  }[item.estado] || 'badge-default'

  return (
    <div className="recurso-card">
      <div className="card-media-wrapper">
        <img
          src={item.imagen_url || IMAGEN_PLACEHOLDER}
          alt={item.titulo}
          className="card-media"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = IMAGEN_PLACEHOLDER
          }}
        />
        <span className="card-id-pill">#{item.id}</span>
        <span className={`card-estado-pill ${estadoClase}`}>{item.estado}</span>
      </div>

      <div className="card-body">
        <div className="card-meta-top">
          <span className="card-categoria-tag">{item.categoria?.nombre ? item.categoria.nombre.toLowerCase() : 'general'}</span>
          <span className="card-creador">{item.usuario_creador?.nombre || 'Creador anonimo'}</span>
        </div>

        <h3 className="card-title">{item.titulo}</h3>
        <p className="card-description">{item.descripcion}</p>

        <div className="progress-section">
          <div className="progress-labels">
            <span>Avance</span>
            <span className="progress-percentage">{item.porcentaje_avance}%</span>
          </div>
          <div className="progress-bar-bg">
            <div
              className={`progress-bar-fill ${item.estado === 'financiado' ? 'fill-complete' : 'fill-active'}`}
              style={{ width: `${porcentaje}%` }}
            ></div>
          </div>
        </div>

        <div className="financial-data-grid">
          <div className="financial-box">
            <span className="financial-label">Meta financiera</span>
            <span className="financial-amount">${metaFormateada} MXN</span>
          </div>
          <div className="financial-box">
            <span className="financial-label">Monto recaudado</span>
            <span className="financial-amount text-success">${recaudadoFormateado} MXN</span>
          </div>
        </div>

        <button
          type="button"
          className="btn-ver-detalle"
          onClick={() => onVerDetalle(item)}
        >
          Ver mas
        </button>
      </div>
    </div>
  )
}
