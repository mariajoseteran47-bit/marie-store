import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const AdminDashboard = () => {
  const { inventory, orders, sales, updateInventoryItem, updateVariantStock, addVariant, removeVariant, getGlobalStock } = useStore();
  const [activeTab, setActiveTab] = useState('inventory');
  
  // States for Editing
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ cost: 0, price: 0, discount: 0, sizes: '', colors: '', images: '', newVarSize: '', newVarColor: '' });

  // Filtro de Fechas
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditForm({ 
      cost: item.cost || 0, 
      price: item.price, 
      discount: item.discount || 0,
      sizes: item.sizes ? item.sizes.join(', ') : '',
      colors: item.colors ? item.colors.join(', ') : '',
      images: item.images ? item.images.join(', ') : '',
      newVarSize: '',
      newVarColor: ''
    });
  };

  const saveEdit = (id) => {
    updateInventoryItem(id, editForm.cost, editForm.price, editForm.discount, editForm.sizes, editForm.colors, editForm.images);
    setEditingId(null);
  };

  // Filtrar las ventas globales según la fecha seleccionada
  const filteredSales = sales.filter(sale => sale.date === selectedDate);
  const totalVendioDia = filteredSales.reduce((acc, sale) => acc + sale.total, 0);

  // Calcular métricas del mes
  const ventasDelMes = sales.reduce((acc, sale) => acc + sale.total, 0);
  const gananciaNeta = sales.reduce((acc, sale) => {
    const invItem = inventory.find(i => i.name === sale.item.split(' (')[0]);
    const cost = invItem ? invItem.cost : 0;
    return acc + (sale.total - (cost * sale.qty));
  }, 0);

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Panel Encargada</h2>
        <button style={activeTab === 'inventory' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('inventory')}>📦 Inventario</button>
        <button style={activeTab === 'orders' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('orders')}>🛍️ Pedidos</button>
        <button style={activeTab === 'sales' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('sales')}>📊 Ventas y Finanzas</button>
        <button style={activeTab === 'billing' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('billing')}>🧾 Facturación</button>
        <div style={{ marginTop: 'auto' }}>
          <button onClick={() => { localStorage.removeItem('isAdmin'); window.location.href='/'; }} style={{...styles.tab, color: 'red', fontWeight: 'bold'}}>⬅️ Cerrar Sesión / Volver</button>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.topBar}>
           <h1 style={styles.pageTitle}>
             {activeTab === 'inventory' && 'Control de Inventario (Variantes)'}
             {activeTab === 'orders' && 'Pedidos de Clientes'}
             {activeTab === 'sales' && 'Ventas y Finanzas'}
             {activeTab === 'billing' && 'Facturación'}
           </h1>
           <div style={styles.bellContainer}>
             🔔 <span style={styles.bellBadge}>{sales.length}</span>
           </div>
        </div>

        {activeTab === 'inventory' && (
          <div className="fade-in">
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Controla el stock exacto por Talla y Color.</p>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Producto</th>
                  <th style={styles.th}>Costo / Precio</th>
                  <th style={styles.th}>Info General</th>
                  <th style={styles.th}>Desglose de Stock (Talla x Color)</th>
                  <th style={styles.th}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => {
                  const isEditing = editingId === item.id;
                  const activeDiscount = isEditing ? editForm.discount : (item.discount || 0);
                  const activePrice = isEditing ? editForm.price : item.price;
                  const activeCost = isEditing ? editForm.cost : item.cost;
                  const finalPrice = activePrice * (1 - activeDiscount / 100);
                  const totalStock = getGlobalStock(item.variants);

                  return (
                    <tr key={item.id} style={styles.tr}>
                      <td style={styles.td}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                          {item.images && item.images.length > 0 && <img src={item.images[0]} alt="prod" style={{width: '40px', height: '40px', borderRadius: '5px', objectFit: 'cover'}} />}
                          <strong>{item.name}</strong>
                        </div>
                      </td>
                      
                      {isEditing ? (
                        <td style={styles.td}>
                          Costo: $<input type="number" value={editForm.cost} onChange={(e) => setEditForm({...editForm, cost: e.target.value})} style={styles.inputSmall} /><br/>
                          Precio: $<input type="number" value={editForm.price} onChange={(e) => setEditForm({...editForm, price: e.target.value})} style={styles.inputSmall} /><br/>
                          Desc: %<input type="number" value={editForm.discount} onChange={(e) => setEditForm({...editForm, discount: e.target.value})} style={styles.inputSmall} />
                        </td>
                      ) : (
                        <td style={styles.td}>
                          <span style={{color: '#888'}}>C:</span> ${item.cost}<br/>
                          <span style={{color: '#888'}}>P:</span> ${item.price}<br/>
                          {item.discount > 0 && <span style={{color: 'var(--accent-color)'}}>-{item.discount}%</span>}
                        </td>
                      )}

                      {isEditing ? (
                         <td style={styles.td}>
                            <input type="text" placeholder="Catálogo Tallas (S,M,L)" value={editForm.sizes} onChange={(e) => setEditForm({...editForm, sizes: e.target.value})} style={{...styles.inputSmall, width: '120px', marginBottom: '5px', display: 'block'}} />
                            <input type="text" placeholder="Catálogo Colores" value={editForm.colors} onChange={(e) => setEditForm({...editForm, colors: e.target.value})} style={{...styles.inputSmall, width: '120px', marginBottom: '5px', display: 'block'}} />
                            <input type="text" placeholder="Links fotos" value={editForm.images} onChange={(e) => setEditForm({...editForm, images: e.target.value})} style={{...styles.inputSmall, width: '120px'}} />
                         </td>
                      ) : (
                        <td style={{ ...styles.td, fontSize: '12px', color: '#6B7280' }}>
                          <strong>T:</strong> {item.sizes?.join(', ') || 'Única'}<br/>
                          <strong>C:</strong> {item.colors?.join(', ') || 'Único'}
                        </td>
                      )}

                      {/* Desglose de Stock por Variantes */}
                      <td style={styles.td}>
                        <div style={{ backgroundColor: '#F9FAFB', padding: '10px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                          {item.variants && item.variants.map(v => (
                            <div key={v.id} style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'5px', fontSize:'13px', borderBottom:'1px dashed #E5E7EB', paddingBottom:'4px'}}>
                              <span style={{fontWeight:'bold', width: '30px'}}>{v.size}</span>
                              <span style={{width: '90px', color: '#4B5563'}}>{v.color}</span>
                              <span style={{width: '40px', textAlign: 'center', color: v.stock === 0 ? 'red' : 'green'}}>{v.stock} u.</span>
                              <div>
                                <button style={styles.actionBtn} onClick={() => updateVariantStock(item.id, v.id, -1)}>-</button>
                                <button style={styles.actionBtn} onClick={() => updateVariantStock(item.id, v.id, 1)}>+</button>
                                {isEditing && <button style={{color:'red', border:'none', background:'none', cursor:'pointer', padding:'0 5px'}} onClick={() => removeVariant(item.id, v.id)}>🗑️</button>}
                              </div>
                            </div>
                          ))}
                          
                          {isEditing && (
                            <div style={{marginTop:'10px', display:'flex', gap:'5px', backgroundColor: 'white', padding: '5px', borderRadius: '5px'}}>
                              <input type="text" placeholder="Talla" value={editForm.newVarSize} onChange={e=>setEditForm({...editForm, newVarSize: e.target.value})} style={{width:'50px', fontSize:'12px', padding:'4px', border:'1px solid #CCC', borderRadius:'4px'}}/>
                              <input type="text" placeholder="Color" value={editForm.newVarColor} onChange={e=>setEditForm({...editForm, newVarColor: e.target.value})} style={{width:'80px', fontSize:'12px', padding:'4px', border:'1px solid #CCC', borderRadius:'4px'}}/>
                              <button className="btn-secondary" style={{padding:'4px 8px', fontSize:'12px'}} onClick={() => { 
                                if(editForm.newVarSize && editForm.newVarColor) {
                                  addVariant(item.id, editForm.newVarSize, editForm.newVarColor, 0); 
                                  setEditForm({...editForm, newVarSize:'', newVarColor:''}); 
                                }
                              }}>+ Añadir Variante</button>
                            </div>
                          )}
                          <div style={{marginTop:'8px', fontWeight:'bold', textAlign: 'right', fontSize: '14px', color: '#1F2937'}}>
                            Total Global: {totalStock} u.
                          </div>
                        </div>
                      </td>

                      <td style={styles.td}>
                        {isEditing ? (
                          <button className="btn-primary" style={{ padding: '8px 15px', fontSize: '13px' }} onClick={() => saveEdit(item.id)}>Guardar Todo</button>
                        ) : (
                          <button className="btn-secondary" style={{ padding: '8px 15px', fontSize: '13px' }} onClick={() => startEditing(item)}>✏️ Editar Producto</button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="fade-in">
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>No. Orden</th>
                  <th style={styles.th}>Cliente</th>
                  <th style={styles.th}>Fecha</th>
                  <th style={styles.th}>Total</th>
                  <th style={styles.th}>Estado</th>
                  <th style={styles.th}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>Aún no hay pedidos globales</td></tr> : null}
                {orders.map(order => (
                  <tr key={order.id} style={styles.tr}>
                    <td style={styles.td}>{order.id}</td>
                    <td style={styles.td}>{order.client}</td>
                    <td style={styles.td}>{order.date}</td>
                    <td style={styles.td}>${order.total.toFixed(2)}</td>
                    <td style={styles.td}>
                      <span style={{ 
                        padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                        backgroundColor: order.status === 'Enviado' ? '#E8F5E9' : '#FFF3E0',
                        color: order.status === 'Enviado' ? '#2E7D32' : '#E65100'
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                        Procesar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="fade-in">
            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
              <div style={styles.metricCard}>
                <h3 style={styles.metricTitle}>Ventas Registradas</h3>
                <p style={styles.metricValue}>${ventasDelMes.toFixed(2)}</p>
                <span style={{ color: 'green', fontSize: '14px' }}>Guardado Permanentemente</span>
              </div>
              <div style={styles.metricCard}>
                <h3 style={styles.metricTitle}>Ganancia Neta</h3>
                <p style={styles.metricValue}>${gananciaNeta.toFixed(2)}</p>
                <span style={{ color: 'green', fontSize: '14px' }}>Basado en tus costos</span>
              </div>
              <div style={styles.metricCard}>
                <h3 style={styles.metricTitle}>Pedidos Completados</h3>
                <p style={styles.metricValue}>{orders.length}</p>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', color: '#374151', margin: 0 }}>🔍 Buscar Ventas por Día</h2>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                />
              </div>

              {filteredSales.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#888', padding: '20px 0' }}>No se encontraron ventas para el día {selectedDate}</p>
              ) : (
                <>
                  <table style={{...styles.table, boxShadow: 'none', border: '1px solid #E5E7EB'}}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Producto Vendido</th>
                        <th style={styles.th}>Cant.</th>
                        <th style={styles.th}>Precio Base</th>
                        <th style={styles.th}>Descuento</th>
                        <th style={styles.th}>Total Cobrado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSales.map(sale => (
                        <tr key={sale.id} style={styles.tr}>
                          <td style={styles.td}><strong>{sale.item}</strong></td>
                          <td style={styles.td}>{sale.qty}</td>
                          <td style={styles.td}>${sale.price}</td>
                          <td style={styles.td}>
                            {sale.discount === '0%' ? <span style={{ color: '#888' }}>Sin descuento</span> : <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>{sale.discount}</span>}
                          </td>
                          <td style={styles.td}>${sale.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ textAlign: 'right', marginTop: '15px', fontSize: '18px' }}>
                    Total vendido en este día: <strong style={{ color: 'green', fontSize: '22px' }}>${totalVendioDia.toFixed(2)}</strong>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="fade-in">
            <h1 style={styles.pageTitle}>Sistema de Facturación</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Genera facturas o comprobantes de venta para tus clientes.</p>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>No. Orden</th>
                  <th style={styles.th}>Cliente</th>
                  <th style={styles.th}>Monto Total</th>
                  <th style={styles.th}>Estado Factura</th>
                  <th style={styles.th}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>Aún no hay pedidos</td></tr> : null}
                {orders.map(order => (
                  <tr key={order.id} style={styles.tr}>
                    <td style={styles.td}>{order.id}</td>
                    <td style={styles.td}>{order.client}</td>
                    <td style={styles.td}>${order.total.toFixed(2)}</td>
                    <td style={styles.td}>
                      <span style={{ color: order.status === 'Enviado' ? 'green' : 'orange', fontWeight: 'bold' }}>
                        {order.status === 'Enviado' ? 'Facturada' : 'Pendiente'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button 
                        className="btn-secondary" 
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                        onClick={() => alert(`📄 Generando PDF de factura para la orden ${order.id}...`)}
                      >
                        📄 Generar Comprobante
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: { display: 'flex', minHeight: '100vh', backgroundColor: '#F3F4F6' },
  sidebar: { width: '250px', backgroundColor: '#FFFFFF', padding: '20px', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '10px' },
  sidebarTitle: { fontSize: '20px', color: 'var(--primary-dark)', marginBottom: '20px', textAlign: 'center' },
  tab: { padding: '12px 15px', border: 'none', backgroundColor: 'transparent', textAlign: 'left', fontSize: '15px', color: '#4B5563', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', display: 'block', width: '100%' },
  activeTab: { padding: '12px 15px', border: 'none', backgroundColor: 'var(--primary-color)', textAlign: 'left', fontSize: '15px', color: '#FFFFFF', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', width: '100%' },
  mainContent: { flex: 1, padding: '40px', overflowY: 'auto', position: 'relative' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  pageTitle: { fontSize: '28px', color: '#1F2937' },
  bellContainer: { position: 'relative', fontSize: '24px', cursor: 'pointer' },
  bellBadge: { position: 'absolute', top: '-5px', right: '-10px', backgroundColor: 'red', color: 'white', borderRadius: '50%', fontSize: '12px', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
  table: { width: '100%', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderCollapse: 'collapse' },
  th: { backgroundColor: '#F9FAFB', padding: '15px', textAlign: 'left', fontSize: '14px', color: '#6B7280', fontWeight: '600', borderBottom: '1px solid #E5E7EB' },
  tr: { borderBottom: '1px solid #F3F4F6' },
  td: { padding: '15px', fontSize: '14px', color: '#374151', verticalAlign: 'top' },
  actionBtn: { width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #E5E7EB', backgroundColor: 'white', fontSize: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 3px', color: '#374151', cursor: 'pointer', fontWeight: 'bold' },
  inputSmall: { width: '60px', padding: '5px', border: '1px solid var(--border-color)', borderRadius: '4px' },
  metricCard: { backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', flex: 1, borderLeft: '4px solid var(--primary-color)' },
  metricTitle: { fontSize: '14px', color: '#6B7280', marginBottom: '10px', fontWeight: 'normal' },
  metricValue: { fontSize: '24px', fontWeight: 'bold', color: '#1F2937', marginBottom: '5px' }
};

export default AdminDashboard;
