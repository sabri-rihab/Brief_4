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




async function loadMissions() {
  try {
    const data = await fetch("missions.json");
    const missions = await data.json();

    const popUp_favorite = document.querySelector(".popUp_favorite");
    const popUp_Add = document.querySelector(".popUp_Add");
    const open_favorite = document.querySelector("#favorite");
    const open_Add = document.querySelector("#Add");
    const search = document.querySelector(".search_input");
    const container = document.querySelector(".ms_cards");

    // show all missions
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
                <button style="background: yellow; width:100px;" class="btn_edit">Edit</button>
                <button style="color: red;" class="btn_delete">Delete</button>
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
        mission.objective.toLowerCase().includes(value)||
        mission.agency.toLowerCase().includes(value)

      );
      showMissions(filtered);
    });

    // Handle pop-Ups
    open_favorite.addEventListener("click", () => {
      popUp_favorite.classList.toggle("show");
      popUp_Add.classList.remove("show");
    });
    open_Add.addEventListener("click", () => {
      popUp_Add.classList.toggle("show");
      popUp_favorite.classList.remove("show");
    });

    // Handle favorites
    const favorite_list = document.querySelector('.favorite_list')
    const close_icon = document.querySelector('.close_icon');
    const icons = document.querySelectorAll(".material-icons");

    // close favorite pop-Up
    close_icon.addEventListener('click', () => {popUp_favorite.classList.remove("show");popUp_Add.classList.remove("show");})
    let favorites = [];

icons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const card = icon.closest(".card");
    const mission = missions.find(m => m.id == card.id);
    const cardFav = favorite_list.querySelector(`#fav-${mission.id}`);

    // If already favorite → remove from list and style
    if (card.classList.contains("favorite")) {
      card.classList.remove("favorite");                        // remove favorite style
      favorites = favorites.filter(fav => fav.id !== mission.id); //remove from favorites
      if (cardFav) cardFav.remove();
      return;
    }

    // Otherwise → add to favorites
    card.classList.add("favorite");
    if (!favorites.some(fav => fav.id === mission.id)) {
      favorites.push(mission);

      favorite_list.innerHTML += `
        <div class="cardFav" id="fav-${mission.id}">
          <img src="${mission.image}" alt="">
          <div class="detailsFav">
            <p class="name_m">${mission.name}</p>
            <p class="detail_m">${mission.objective}</p>
            <p class="detail_m" style="width: 100%;">${mission.launchDate}</p>
            <span><a style="color: #6FB1FC;" href="#">${mission.agency}</a></span>
          </div>
          <div class="buttons">
            <button class="remove">Remove</button>
            <button class="edit">Edit</button>
          </div>
        </div>`;
    }
  });
});

// 🧩 Use event delegation for remove buttons
favorite_list.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const cardFav = e.target.closest(".cardFav");
    const id = parseInt(cardFav.id.replace("fav-", ""));
    favorites = favorites.filter(fav => fav.id !== id);
    cardFav.remove();

    // Remove favorite class from original card
    const originalCard = document.getElementById(id);
    if (originalCard) originalCard.classList.remove("favorite");
  }
});
    const add_btn = document.getElementById("add_btn");
    const new_name = document.getElementById("new_name");
    const new_dsc = document.getElementById("new_dsc");
    const new_agency = document.getElementById("new_agency");
    const new_img = document.getElementById("new_img");
    const new_date = document.getElementById("new_date");
    function addMission(){
        let ids = 11;
        add_btn.addEventListener("click", () => {
            const mission = {
                id: ids++,
                name: new_name.value,
                objective: new_dsc.value,
                agency: new_agency.value,
                image: URL.createObjectURL(new_img.files[0]),
                launchDate: new_date.value
            };
            missions.push(mission);
            showMissions(missions);
            new_name.value = "";
            new_dsc.value = "";
            new_agency.value = "";
            new_img.value = "";
            new_date.value = "";
        });
    }
    addMission();
//-------------------------------   EDIT   --------------------------------------------------------------------------------------------------
    function editMission(missions) {
        const editButtons = document.querySelectorAll('.btn_edit');
        editButtons.forEach(button => {
          button.addEventListener('click', () => {  

            const card = button.closest('.card');
            const id = parseInt(card.id);
            const mission = missions.find(m => m.id === id);
            popUp_Add.classList.add("show");
            new_name.value = mission.name;
            new_dsc.value = mission.objective;
            new_agency.value = mission.agency;
            new_date.value = mission.launchDate;
            new_img.value = "";     
            
            const saveButton = document.getElementById('edit_btn');
            saveButton.onclick = () => {
              mission.name = new_name.value;
              mission.objective = new_dsc.value;
              mission.agency = new_agency.value;
              mission.launchDate = new_date.value;
                if (new_img.files.length > 0) {
                    mission.image = URL.createObjectURL(new_img.files[0]);
                }
              showMissions(missions);
              new_name.value = "";
              new_dsc.value = "";
              new_agency.value = "";
              new_img.value = "";
              new_date.value = "";
            };
            });
          
    })
    }
    editMission(missions);

        

    

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
