// fetch("missions.json")
//     .then(function(response){return response.json()})
//     .then(function(missions){
//         let container = document.querySelector(".ms_cards");
//         // const name_mission = "appolo";
//         let place ="";
//         for(var mission of missions){
//             place += `
//                 <div class="card">
//                     <img src='${mission.image}' alt="">
//                     <div class="details">
//                         <p class="name_m">${mission.name}</p>
//                         <p class="detail_m">${mission.objective}</p>
//                         <p class="detail_m" style="width: 100%;">${mission.launchDate}</p>
//                         <span><a style="color: #6FB1FC;" href="#">${mission.agency}</a></span>
//                     </div>
//                 </div>
//             `;

//         }
//         container.innerHTML = place;
//         // const result = missions.filter((mission) => missoin == name_mission);
//         // console.log(result);
//     })
//     .catch(error => console.error("Error loading missions:", error));

// async function loadMissions() {
//   try {
//     const data = await fetch("missions.json");
//     const missions = await data.json();

//     const container = document.querySelector(".ms_cards");
//     container.innerHTML = missions.map(m => `
//       <div class="card" id="${m.id}">
//         <img src="${m.image}" alt="">
//         <i class="material-icons">favorite</i>
//         <div class="details">
//           <p class="name_m">${m.name}</p>
//           <p class="detail_m">${m.objective}</p>
//           <p class="detail_m" style="width:100%;">${m.launchDate}</p>
//           <span><a style="color:#6FB1FC;" href="#">${m.agency}</a></span>
//         </div>
//       </div>
//     `).join('');

//     const icons = document.querySelectorAll(".material-icons");
//     const popUp = document.querySelector(".popUp_favorite");
//     const openFav = document.querySelector("#favorite");
//     const closeFav = document.querySelector(".close_icon");
//     const favoriteList = document.querySelector(".favorite_list");

//     icons.forEach(icon => {
//       icon.addEventListener("click", () => {
//         const card = icon.closest(".card");
//         card.classList.toggle("favorite");
//       });
//     });

//     openFav.addEventListener("click", () => {
//       const favCards = document.querySelectorAll(".card.favorite");
//       let html = "";
//       favCards.forEach(c => {
//         const m = missions.find(x => x.id == c.id);
//         html += `
//           <div class="card">
//             <img src="${m.image}" alt="">
//             <div class="details">
//               <p class="name_m">${m.name}</p>
//               <p class="detail_m">${m.objective}</p>
//             </div>
//           </div>
//         `;
//       });
//       favoriteList.innerHTML = html;
//       popUp.classList.toggle("show");
//     });
//     const search = document.querySelector(".search_input").value;
//     closeFav.addEventListener("click", () => popUp.classList.remove("show"));

//   } catch (error) {
//     console.error("Error loading missions...", error);
//   }
// }
// loadMissions();


// async function loadMissions(){
//     try {
//         const data = await fetch("missions.json")
//         const missions = await data.json();       
//         const icons = document.querySelectorAll(".material-icons");
//         let popUp_favorite = document.querySelector(".popUp_favorite");
//         const popUp_Add = document.querySelector('.popUp_Add');
//         const open_favorite = document.querySelector("#favorite");
//         const open_Add = document.querySelector("#Add");
//         const search = document.querySelector('.search_input');
//         let container = document.querySelector(".ms_cards");



        
//         function showMissions(list){
//             search.addEventListener('input', (e) => {
//                 const value = e.target.value.toLowerCase();
//                 const Filtered = missions.filter(mission =>
//                     mission.name.toLowerCase().includes(value)
//                 ) 
//             })
//             container.innerHTML = list.filter(mission => {mission.name.toLowerCase().includes(value)}).map(mission =>
//                 `
//                     <div class="card" id="${mission.id}">
//                         <img src='${mission.image}' alt="">
//                         <i class="material-icons">favorite</i>
//                         <div class="details">
//                             <p class="name_m">${mission.name}</p>
//                             <p class="detail_m">${mission.objective}</p>
//                             <p class="detail_m" style="width: 100%;">${mission.launchDate}</p>
//                             <span><a style="color: #6FB1FC;" href="#">${mission.agency}</a></span>
//                         </div>
//                     </div>`).join('');
//             }


//         showMissions(missions)


        


//         open_favorite.addEventListener('click', () => {
//             popUp_favorite.classList.toggle('show');
//             popUp_Add.classList.toggle('show');
//         })
//         open_Add.addEventListener('click', () => {
//             popUp_Add.classList.toggle('show');
//             popUp_favorite.classList.toggle('show');
//         })

        

//         icons.forEach(icon => {
//             icon.addEventListener('click' ,() => {
//                 const card = icon.closest(".card");
//                 const _id = card.id;
//                 card.classList.toggle("favorite")
//                 const favCards = document.querySelectorAll(".card.favorite");
             
//                 const close_icon = document.querySelector('.close_icon');
//                 close_icon.addEventListener('click', () => {popUp_favorite.classList.toggle("show");})

//                 console.log(_id)
//                 })
//             });
        

//         console.log(missions);
//     }catch(error){
//         console.error("Error loading missions...",error)
//     }
// }
// loadMissions();

async function loadMissions() {
  try {
    const data = await fetch("missions.json");
    const missions = await data.json();

    const icons = document.querySelectorAll(".material-icons");
    const popUp_favorite = document.querySelector(".popUp_favorite");
    const popUp_Add = document.querySelector(".popUp_Add");
    const open_favorite = document.querySelector("#favorite");
    const open_Add = document.querySelector("#Add");
    const search = document.querySelector(".search_input");
    const container = document.querySelector(".ms_cards");

    // 🧩 Function to render a list of missions
    function showMissions(list) {
      container.innerHTML = list
        .map(
          (mission) => `
            <div class="card" id="${mission.id}">
              <img src='${mission.image}' alt="">
              <i class="material-icons">favorite</i>
              <div class="details">
                <p class="name_m">${mission.name}</p>
                <p class="detail_m">${mission.objective}</p>
                <p class="detail_m" style="width: 100%;">${mission.launchDate}</p>
                <span><a style="color: #6FB1FC;" href="#">${mission.agency}</a></span>
              </div>
            </div>`
        )
        .join("");
    }

    // Show all missions initially
    showMissions(missions);

    // 🔍 Filter missions when typing
    search.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      const filtered = missions.filter((mission) =>
        mission.name.toLowerCase().includes(value) ||
        mission.objective.toLowerCase().includes(value)

      );
      showMissions(filtered);
    });

    // Handle popups
    open_favorite.addEventListener("click", () => {
      popUp_favorite.classList.toggle("show");
      popUp_Add.classList.remove("show");
    });
    open_Add.addEventListener("click", () => {
      popUp_Add.classList.toggle("show");
      popUp_favorite.classList.remove("show");
    });

    // Handle favorites
    icons.forEach((icon) => {
      icon.addEventListener("click", () => {
        const card = icon.closest(".card");
        card.classList.toggle("favorite");
        console.log("Favorite toggled:", card.id);
      });
    });

  } catch (error) {
    console.error("Error loading missions:", error);
  }
}

loadMissions();
// fetch('missions.json')
//     .then(res => res.json())
//     .then(data => {
//         const listMissions = data;
//         const container = document.querySelector('.ms_cards');
//         // let cards = "";
//         if( listMissions.length > 0 ){
//             listMissions.forEach(mission => {
//                 container.innerHTML += `
//                         <div class="card">
//                             <img src='${mission.image}' alt="">
//                             <div class="details">
//                                 <p class="name_m">${mission.name}</p>
//                                 <p class="detail_m">${mission.objective}</p>
//                                 <p class="detail_m" style="width: 100%;">${mission.launchDate}</p>
//                                 <span><a style="color: #6FB1FC;" href="#">${mission.agency}</a></span>
//                             </div>
//                         </div>  
//                 `
//             })
//         }
//         // container.innerHTML = cards;
//         console.log(listMissions);
//     })
//     .catch(error => console.error(error))
