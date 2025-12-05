import{s as i}from"./supabase.CX3PRodD.js";import"./_commonjsHelpers.gnU0ypJ3.js";async function p(){const t=document.getElementById("facturas-tbody"),s=document.getElementById("ordenes-en-ruta"),o=document.getElementById("ordenes-entregadas");if(t)try{const a=localStorage.getItem("auth_session");if(!a){t.innerHTML='<tr><td colspan="6" class="px-4 py-8 text-center text-red-500">Debes iniciar sesión.</td></tr>';return}const d=JSON.parse(a),{data:n,error:r}=await i.from("cotizaciones").select(`
            *,
            vehicles (
              marca,
              modelo_año,
              precio
            )
          `).eq("user_id",d.id).order("created_at",{ascending:!1});if(r)throw r;if(!n||n.length===0){t.innerHTML='<tr><td colspan="6" class="px-4 py-8 text-center text-gray-500">No tienes facturas todavía.</td></tr>';return}const l=n.filter(e=>e.estado==="en_ruta"||e.estado==="aprobada"),c=n.filter(e=>e.estado==="entregada");s&&(s.textContent=l.length.toString()),o&&(o.textContent=c.length.toString()),t.innerHTML=n.map(e=>`
          <tr class="border-b hover:bg-gray-50">
            <td class="px-4 py-3 font-mono text-sm">#${e.id.slice(0,8)}</td>
            <td class="px-4 py-3 text-sm">${new Date(e.created_at).toLocaleDateString("es-GT")}</td>
            <td class="px-4 py-3 text-sm">${e.vehicles?.marca||"Vehículo"} ${e.vehicles?.modelo_año||""}</td>
            <td class="px-4 py-3 text-sm font-bold">QTZ ${e.vehicles?.precio?.toLocaleString()||"N/A"}</td>
            <td class="px-4 py-3">
              <span class="inline-block px-2 py-1 rounded text-xs font-semibold ${e.estado==="entregada"?"bg-green-100 text-green-800":e.estado==="en_ruta"||e.estado==="aprobada"?"bg-blue-100 text-blue-800":e.estado==="rechazada"?"bg-red-100 text-red-800":"bg-yellow-100 text-yellow-800"}">
                ${e.estado==="entregada"?"Entregada":e.estado==="en_ruta"||e.estado==="aprobada"?"En Ruta":e.estado==="pendiente"?"Pendiente":"Rechazada"}
              </span>
            </td>
            <td class="px-4 py-3">
              ${e.estado==="entregada"?`<button class="text-blue-600 hover:underline text-sm" onclick="alert('Función de descarga próximamente')">Descargar PDF</button>`:'<span class="text-gray-400 text-sm">N/A</span>'}
            </td>
          </tr>
        `).join("")}catch(a){console.error("Error cargando billing:",a),t.innerHTML='<tr><td colspan="6" class="px-4 py-8 text-center text-red-500">Error al cargar facturas.</td></tr>'}}p();
