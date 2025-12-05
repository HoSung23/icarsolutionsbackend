import{s as i}from"./supabase.CX3PRodD.js";import"./_commonjsHelpers.gnU0ypJ3.js";async function c(){const t=document.getElementById("ordenes-container");if(t)try{const a=localStorage.getItem("auth_session");if(!a){t.innerHTML='<p class="text-red-500">Debes iniciar sesión para ver tus órdenes.</p>';return}const o=JSON.parse(a),{data:s,error:r}=await i.from("cotizaciones").select(`
            *,
            vehicles (
              marca,
              modelo_año,
              precio,
              imagenes
            )
          `).eq("user_id",o.id).order("created_at",{ascending:!1});if(r)throw r;if(!s||s.length===0){t.innerHTML='<p class="text-gray-500">No tienes órdenes todavía.</p>';return}t.innerHTML=s.map(e=>`
          <div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
            <div class="flex items-start justify-between">
              <div class="flex gap-4">
                ${e.vehicles?.imagenes?.[0]?`<img src="${e.vehicles.imagenes[0]}" alt="Vehículo" class="w-24 h-24 object-cover rounded" />`:'<div class="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-4xl">🚗</div>'}
                <div>
                  <h3 class="font-bold text-lg">${e.vehicles?.marca||"Vehículo"} ${e.vehicles?.modelo_año||""}</h3>
                  <p class="text-gray-600">Orden #${e.id.slice(0,8)}</p>
                  <p class="text-sm text-gray-500">Fecha: ${new Date(e.created_at).toLocaleDateString("es-GT")}</p>
                  <p class="text-blue-600 font-bold mt-2">QTZ ${e.vehicles?.precio?.toLocaleString()||"N/A"}</p>
                </div>
              </div>
              <div>
                <span class="inline-block px-3 py-1 rounded-full text-sm font-semibold ${e.estado==="aprobada"?"bg-green-100 text-green-800":e.estado==="rechazada"?"bg-red-100 text-red-800":"bg-yellow-100 text-yellow-800"}">
                  ${e.estado==="pendiente"?"Pendiente":e.estado==="aprobada"?"Aprobada":"Rechazada"}
                </span>
              </div>
            </div>
            ${e.comentarios?`<div class="mt-4 pt-4 border-t border-gray-200">
                <p class="text-sm text-gray-600"><strong>Comentarios:</strong> ${e.comentarios}</p>
              </div>`:""}
          </div>
        `).join("")}catch(a){console.error("Error cargando órdenes:",a),t.innerHTML='<p class="text-red-500">Error al cargar las órdenes.</p>'}}c();
