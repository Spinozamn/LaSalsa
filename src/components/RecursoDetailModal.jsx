import { useEffect } from 'react'

const IMAGEN_PLACEHOLDER = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22360%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%231e293b%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22Arial%22%20font-size%3D%2218%22%3EImagen%20no%20disponible%3C%2Ftext%3E%3C%2Fsvg%3E'

export default function RecursoDetailModal({ detalle, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!detalle) return null

  const porcentaje = Math.min(Number(detalle.porcentaje_avance) || 0, 100)
  const metaFormateada = Number(detalle.meta_financiera || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })
  const recaudadoFormateado = Number(detalle.monto_recaudado || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })

  function formatearFecha(cadenaFecha) {
    if (!cadenaFecha) return 'No definida'
    const f = new Date(cadenaFecha)
    return f.toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-subtitle">Detalle administrativo del recurso</span>
            <h2 className="modal-title">#{detalle.id} — {detalle.titulo}</h2>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">
            &times;
          </button>
        </div>

        <div className="modal-content-scroller">
          <div className="modal-image-wrapper">
            <img
              key={detalle.id}
              src={detalle.imagen_url || IMAGEN_PLACEHOLDER}
              alt={detalle.titulo}
              className="modal-image"
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = IMAGEN_PLACEHOLDER
              }}
            />
          </div>

          <div className="modal-section">
            <h4 className="modal-section-title">Descripcion del proyecto</h4>
            <p className="modal-description-text">{detalle.descripcion}</p>
          </div>

          <div className="modal-meta-grid">
            <div className="modal-meta-card">
              <span className="modal-meta-card-label">Categoria</span>
              <span className="modal-meta-card-value">
                {detalle.categoria?.nombre ? detalle.categoria.nombre.toLowerCase() : 'general'}
              </span>
            </div>
            <div className="modal-meta-card">
              <span className="modal-meta-card-label">Estado</span>
              <span className="modal-meta-card-value">{detalle.estado}</span>
            </div>
            <div className="modal-meta-card">
              <span className="modal-meta-card-label">Meta financiera</span>
              <span className="modal-meta-card-value">${metaFormateada} MXN</span>
            </div>
            <div className="modal-meta-card">
              <span className="modal-meta-card-label">Monto recaudado</span>
              <span className="modal-meta-card-value text-success">${recaudadoFormateado} MXN</span>
            </div>
          </div>

          <div className="modal-progress-box">
            <div className="progress-labels">
              <span>Porcentaje de avance general</span>
              <span className="progress-percentage">{detalle.porcentaje_avance}%</span>
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill fill-complete"
                style={{ width: `${porcentaje}%` }}
              ></div>
            </div>
          </div>

          <div className="modal-info-columns">
            <div className="modal-info-block">
              <h5 className="modal-info-block-title">Creador responsable</h5>
              <p className="modal-info-line">
                <strong>Nombre:</strong> {detalle.usuario_creador?.nombre || 'No asignado'}
              </p>
              <p className="modal-info-line">
                <strong>Correo:</strong> {detalle.usuario_creador?.email || 'Sin correo registrado'}
              </p>
            </div>

            <div className="modal-info-block">
              <h5 className="modal-info-block-title">Calendario</h5>
              <p className="modal-info-line">
                <strong>Fecha de inicio:</strong> {formatearFecha(detalle.fecha_inicio)}
              </p>
              <p className="modal-info-line">
                <strong>Fecha de cierre:</strong> {formatearFecha(detalle.fecha_fin)}
              </p>
            </div>
          </div>

          <div className="modal-section">
            <h4 className="modal-section-title">
              Donadores y aportaciones {detalle.contribuciones ? `(${detalle.contribuciones.length})` : ''}
            </h4>
            {!detalle.contribuciones ? (
              <p className="modal-empty-text">Cargando aportaciones...</p>
            ) : detalle.contribuciones.length > 0 ? (
              <div className="modal-list-box">
                {detalle.contribuciones.map((c) => (
                  <div key={c.id} className="modal-list-item">
                    <div>
                      <strong>{c.donador}</strong>
                      <span className="modal-item-sub"> via {c.metodo_pago}</span>
                    </div>
                    <span className="modal-item-amount text-success">
                      ${Number(c.monto).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="modal-empty-text">Sin aportaciones registradas aun.</p>
            )}
          </div>

          <div className="modal-section">
            <h4 className="modal-section-title">
              Comentarios de la comunidad {detalle.comentarios ? `(${detalle.comentarios.length})` : ''}
            </h4>
            {!detalle.comentarios ? (
              <p className="modal-empty-text">Cargando comentarios...</p>
            ) : detalle.comentarios.length > 0 ? (
              <div className="modal-comments-box">
                {detalle.comentarios.map((cm) => (
                  <div key={cm.id} className={`modal-comment-card ${cm.es_respuesta ? 'comment-reply' : ''}`}>
                    <div className="modal-comment-header">
                      <strong>{cm.autor}</strong>
                      <span className="modal-item-sub">{formatearFecha(cm.fecha)}</span>
                    </div>
                    <p className="modal-comment-text">{cm.contenido}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="modal-empty-text">Sin comentarios registrados aun.</p>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-modal-close" onClick={onClose}>
            Minimizar
          </button>
        </div>
      </div>
    </div>
  )
}
