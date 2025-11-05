// // fetch("missions.json")
// //     .then(function(response){return response.json()})
// //     .then(function(missions){
// //         let container = document.querySelector(".ms_cards");
// //         // const name_mission = "appolo";
// //         let place ="";
// //         for(var mission of missions){
// //             place += `
// //                 <div class="card">
// //                     <img src='${mission.image}' alt="">
// //                     <div class="details">
// //                         <p class="name_m">${mission.name}</p>
// //                         <p class="detail_m">${mission.objective}</p>
// //                         <p class="detail_m" style="width: 100%;">${mission.launchDate}</p>
// //                         <span><a style="color: #6FB1FC;" href="#">${mission.agency}</a></span>
// //                     </div>
// //                 </div>
// //             `;

// //         }
// //         container.innerHTML = place;
// //         // const result = missions.filter((mission) => missoin == name_mission);
// //         // console.log(result);
// //     })
// //     .catch(error => console.error("Error loading missions:", error));

// async function loadMissions() {
//   try {
//     const data = await fetch("missions.json");
//     const missions = await data.json();

//     const popUp_favorite = document.querySelector(".popUp_favorite");
//     const popUp_Add = document.querySelector(".popUp_Add");
//     const open_favorite = document.querySelector("#favorite");
//     const open_Add = document.querySelector("#Add");
//     const search = document.querySelector(".search_input");
//     const container = document.querySelector(".ms_cards");

//     // show all missions
//     function showMissions(list) {
//       container.innerHTML = list
//         .map(
//           (mission) => `
//             <div class="card" id="${mission.id}">
//               <img src='${mission.image}' alt="">
//               <i class="material-icons">favorite</i>
//               <div class="details">
//                 <p class="name_m">${mission.name}</p>
//                 <p class="detail_m">${mission.objective}</p>
//                 <p class="detail_m" style="width: 100%;">${mission.launchDate}</p>
//                 <span><a style="color: #6FB1FC;" href="#">${mission.agency}</a></span>
//                 <button style="background: yellow; width:100px;" class="btn_edit">Edit</button>
//                 <button style="color: red;" class="btn_delete">Delete</button>
//               </div>
//             </div>`
//         )
//         .join("");
//     }

//     // Show all missions initially
//     showMissions(missions);

//     // 🔍 Filter missions when typing
//     search.addEventListener("input", (e) => {
//       const value = e.target.value.toLowerCase();
//       const filtered = missions.filter((mission) =>
//         mission.name.toLowerCase().includes(value) ||
//         mission.objective.toLowerCase().includes(value)||
//         mission.agency.toLowerCase().includes(value)

//       );
//       showMissions(filtered);
//       editMission(missions);
//       deleteMission(missions);
//     });

//     // Handle pop-Ups
//     open_favorite.addEventListener("click", () => {
//       popUp_favorite.classList.toggle("show");
//       popUp_Add.classList.remove("show");
//     });
//     open_Add.addEventListener("click", () => {
//       popUp_Add.classList.toggle("show");
//       popUp_favorite.classList.remove("show");
//     });

//     // Handle favorites
//     const favorite_list = document.querySelector('.favorite_list')
//     const close_icon = document.querySelector('.close_icon');
//     const icons = document.querySelectorAll(".material-icons");

//     // close favorite pop-Up
//     close_icon.addEventListener('click', () => {popUp_favorite.classList.remove("show");popUp_Add.classList.remove("show");})
//     let favorites = [];

// icons.forEach((icon) => {
//   icon.addEventListener("click", () => {
//     const card = icon.closest(".card");
//     const mission = missions.find(m => m.id == card.id);
//     const cardFav = favorite_list.querySelector(`#fav-${mission.id}`);

//     // If already favorite remove from list and style
//     if (card.classList.contains("favorite")) {
//       card.classList.remove("favorite");                        // remove favorite style
//       favorites = favorites.filter(fav => fav.id !== mission.id); //remove from favorites
//       if (cardFav) cardFav.remove();
//       return;
//     }

//     // Otherwise → add to favorites
//     card.classList.add("favorite");
//     if (!favorites.some(fav => fav.id === mission.id)) {
//       favorites.push(mission);

//       favorite_list.innerHTML += `
//         <div class="cardFav" id="fav-${mission.id}">
//           <img src="${mission.image}" alt="">
//           <div class="detailsFav">
//             <p class="name_m">${mission.name}</p>
//             <p class="detail_m">${mission.objective}</p>
//             <p class="detail_m" style="width: 100%;">${mission.launchDate}</p>
//             <span><a style="color: #6FB1FC;" href="#">${mission.agency}</a></span>
//           </div>
//           <div class="buttons">
//             <button class="remove">Remove</button>
//             <button class="edit">Edit</button>
//           </div>
//         </div>`;
//     }
//   });
// });

// // @ Use event delegation for remove buttons
// favorite_list.addEventListener("click", (e) => {
//   if (e.target.classList.contains("remove")) {
//     const cardFav = e.target.closest(".cardFav");
//     const id = parseInt(cardFav.id.replace("fav-", ""));
//     favorites = favorites.filter(fav => fav.id !== id);
//     cardFav.remove();

//     // Remove favorite class from original card
//     const originalCard = document.getElementById(id);
//     if (originalCard) originalCard.classList.remove("favorite");
//   }
// });
//     const add_btn = document.getElementById("add_btn");
//     const new_name = document.getElementById("new_name");
//     const new_dsc = document.getElementById("new_dsc");
//     const new_agency = document.getElementById("new_agency");
//     const new_img = document.getElementById("new_img");
//     const new_date = document.getElementById("new_date");
//     function addMission(){
//         let ids = 11;
//         add_btn.addEventListener("click", () => {
//             saveButton.disabled = true;
//             const mission = {
//                 id: ids++,
//                 name: new_name.value,
//                 objective: new_dsc.value,
//                 agency: new_agency.value,
//                 image: URL.createObjectURL(new_img.files[0]),
//                 launchDate: new_date.value
//             };
//             missions.push(mission);
//             showMissions(missions);
//             new_name.value = "";
//             new_dsc.value = "";
//             new_agency.value = "";
//             new_img.value = "";
//             new_date.value = "";
//         });
//     }
//     addMission();
// //-------------------------------   EDIT   --------------------------------------------------------------------------------------------------
//     function editMission(missions) {
//         const editButtons = document.querySelectorAll('.btn_edit');
//         editButtons.forEach(button => {
//           button.addEventListener('click', () => {
//             const card = button.closest('.card');
//             const id = parseInt(card.id);
//             const mission = missions.find(m => m.id === id);
//             popUp_Add.classList.add("show");

//             new_name.value = mission.name;
//             new_dsc.value = mission.objective;
//             new_agency.value = mission.agency;
//             new_date.value = mission.launchDate;
//             new_img.value = "";

//             const saveButton = document.getElementById('edit_btn');
//             saveButton.onclick = () => {
//               add_btn.disabled = true;
//               mission.name = new_name.value;
//               mission.objective = new_dsc.value;
//               mission.agency = new_agency.value;
//               mission.launchDate = new_date.value;
//                 if (new_img.files.length > 0) {
//                     mission.image = URL.createObjectURL(new_img.files[0]);
//                 }
//               showMissions(missions);
//               new_name.value = "";
//               new_dsc.value = "";
//               new_agency.value = "";
//               new_img.value = "";
//               new_date.value = "";
//             };
//             });

//     })
//     }
//     editMission(missions);

//      function deleteMission(missions) {
//         const deleteButtons = document.querySelectorAll('.btn_delete');
//         deleteButtons.forEach(button => {
//           button.addEventListener('click', () => {
//             const card = button.closest('.card');
//             const id = parseInt(card.id);
//             const confirmDelete = window.confirm("Are you sure you want to delete this mission?");
//             if (confirmDelete) {
//                 missions = missions.filter(m => m.id !== id);
//                 //     // Alternative approach:
//                 //   const index = missions.findIndex(m => m.id === id);
//                 //     if (index !== -1) {
//                     //         missions.splice(index, 1); // Remove mission from array
//                     //         showMissions(missions); // Update display
//                     //     }
//                 }
//                 showMissions(missions);
//                 deleteMission(missions);
//           });
//         });
//       }
//         deleteMission(missions);

//   } catch (error) {
//     console.error("Error loading missions:", error);
//   }
// }

// loadMissions();
// // fetch('missions.json')
// //     .then(res => res.json())
// //     .then(data => {
// //         const listMissions = data;
// //         const container = document.querySelector('.ms_cards');
// //         // let cards = "";
// //         if( listMissions.length > 0 ){
// //             listMissions.forEach(mission => {
// //                 container.innerHTML += `
// //                         <div class="card">
// //                             <img src='${mission.image}' alt="">
// //                             <div class="details">
// //                                 <p class="name_m">${mission.name}</p>
// //                                 <p class="detail_m">${mission.objective}</p>
// //                                 <p class="detail_m" style="width: 100%;">${mission.launchDate}</p>
// //                                 <span><a style="color: #6FB1FC;" href="#">${mission.agency}</a></span>
// //                             </div>
// //                         </div>
// //                 `
// //             })
// //         }
// //         // container.innerHTML = cards;
// //         console.log(listMissions);
// //     })
// //     .catch(error => console.error(error))

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
    const agencyFilter = document.getElementById("select_agency");
    const dateFilter = document.getElementById("select_date");

    const add_btn = document.getElementById("add_btn");
    const edit_btn = document.getElementById("edit_btn");
    const new_name = document.getElementById("new_name");
    const new_dsc = document.getElementById("new_dsc");
    const new_agency = document.getElementById("select_agency");
    const new_img = document.getElementById("new_img");
    const new_date = document.getElementById("new_date");



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
  

    showMissions(missions);


    // Handel pop-Ups
    open_favorite.addEventListener("click", () => {
      popUp_favorite.classList.toggle("show");
      popUp_Add.classList.remove("show");
    });
    open_Add.addEventListener("click", () => {
      popUp_Add.classList.toggle("show");
      popUp_favorite.classList.remove("show");
    });

    const favorite_list = document.querySelector(".favorite_list");
    const close_icon = document.querySelector(".close_icon");
    const icons = document.querySelectorAll(".material-icons");

    document.body.addEventListener("click", (e) => {
      if (e.target.classList.contains("close_icon")) {
        popUp_favorite.classList.remove("show");
        popUp_Add.classList.remove("show");
      }
    });
 

    // Handle favorites
    function AddToFavorites() {
        let favorites = [];

      icons.forEach((icon) => {
        icon.addEventListener("click", () => {
          const card = icon.closest(".card");
          const mission = missions.find((m) => m.id == card.id);
          const cardFav = favorite_list.querySelector(`#fav-${mission.id}`);

          if (card.classList.contains("favorite")) {
            card.classList.remove("favorite");
            favorites = favorites.filter((fav) => fav.id !== mission.id);
            if (cardFav) cardFav.remove();
            return;
          }

          card.classList.add("favorite");
          if (!favorites.some((fav) => fav.id === mission.id)) {
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
        favorite_list.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove")) {
          const cardFav = e.target.closest(".cardFav");
          const id = parseInt(cardFav.id.replace("fav-", ""));
          favorites = favorites.filter((fav) => fav.id !== id);
          cardFav.remove();
          const originalCard = document.getElementById(id);
          if (originalCard) originalCard.classList.remove("favorite");
        }
      });

      })

        });
      };
  AddToFavorites();


// -------------------------------   FILTER   --------------------------------------------------------------------------------------------------
  function FilterMissions(missions) {              // FILTER FUNCTION 
      const agency = agencyFilter.value;
      const date = dateFilter.value;
      let filtered = missions;

      console.log("first test", filtered);        // first test

    const value = search.value.toLowerCase();
    if(value){
      filtered = filtered.filter(mission => 
      mission.name.toLowerCase().includes(value) ||
      mission.objective.toLowerCase().includes(value)
    )

    }

   if(agency) {
    filtered = filtered.filter(mission => mission.agency === agency);         // Filter by agency
   }


    if (date === 'before_2000') {                    // Filter by lunching date
      filtered = filtered.filter(mission => mission.launchDate < '2000-01-01')}
     else if (date === 'in_2000s'){
      filtered = filtered.filter(mission => mission.launchDate >= '2000-01-01' && mission.launchDate <= '2030-12-31')}
     else if( date === 'after_2030'){
      filtered = filtered.filter(mission =>  mission.launchDate > '2030-12-31' )}


     //  Clear filters
        document.querySelector('.clear-filter').addEventListener('click', (e) => {
        e.preventDefault();
        agencyFilter.value = "";
        dateFilter.value = "";
        search.value = "";
        filtered = missions;
        showMissions(filtered);
        FilterMissions(missions);
        deleteMission(missions);
        
      })
      console.log("seconde test", filtered); // second test
      
      deleteMission(missions);
      editMission(missions);
      showMissions(filtered);
    }
    FilterMissions(missions);
    // FilterMissions(filtered);
    
    //refreach filter on change
    agencyFilter.addEventListener('change', () => FilterMissions(missions))
    dateFilter.addEventListener('change', () => FilterMissions(missions))
    search.addEventListener('input', () => FilterMissions(missions))



// -------------------------------   ADD   --------------------------------------------------------------------------------------------------
    function addMission() {                // ADD FUNCTION
      let ids = 11;
      add_btn.addEventListener("click", () => {
        edit_btn.disabled = true;
        const mission = {
          id: ids++,
          name: new_name.value,
          objective: new_dsc.value,
          agency: new_agency.value,
          image: URL.createObjectURL(new_img.files[0]),
          launchDate: new_date.value,
        };        
        if (                          // Chack if the fields are filled
          !new_name.value.trim() ||
          !new_dsc.value.trim() ||
          !new_agency.value ||
          !new_date.value ||
          new_img.files.length === 0
        ) {
          alert("Please fill all fields before adding a mission!");
          return;
        }
        missions.push(mission);
        showMissions(missions);
        editMission(missions);
        deleteMission(missions);
        add_btn.disabled = false;
        new_name.value = "";
        new_dsc.value = "";
        new_agency.value = "";
        new_img.value = "";
        new_date.value = "";
      });
    };
    addMission();


    //-------------------------------   EDIT   --------------------------------------------------------------------------------------------------
    function editMission(missions) {
      const editButtons = document.querySelectorAll(".btn_edit");
      editButtons.forEach((button) => {
        button.addEventListener("click", () => {
          add_btn.disabled = true;
          edit_btn.disabled = false;
          const card = button.closest(".card");
          const id = parseInt(card.id);
          const mission = missions.find((m) => m.id === id);
          popUp_Add.classList.add("show");

          new_name.value = mission.name;
          new_dsc.value = mission.objective;
          new_agency.value = mission.agency;
          new_date.value = mission.launchDate;
          new_img.value = "";

          edit_btn.onclick = () => {
            mission.name = new_name.value;
            mission.objective = new_dsc.value;
            mission.agency = new_agency.value;
            mission.launchDate = new_date.value;
            if (new_img.files.length > 0) {
              mission.image = URL.createObjectURL(new_img.files[0]);
            }
            showMissions(missions);
            editMission(missions);
            deleteMission(missions);
            add_btn.disabled = false;
            edit_btn.disabled = true;
            new_name.value = "";
            new_dsc.value = "";
            new_agency.value = "";
            new_img.value = "";
            new_date.value = "";
            popUp_Add.classList.remove("show");
          };
        });
      });
    }
    editMission(missions);

    //-------------------------------   DELETE   --------------------------------------------------------------------------------------------------
    function deleteMission(missions) {
      const deleteButtons = document.querySelectorAll(".btn_delete");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const card = button.closest(".card");
          const id = parseInt(card.id);
          const confirmDelete = window.confirm(
            "Are you sure you want to delete this mission?"
          );
          if (confirmDelete) {
            missions = missions.filter((m) => m.id !== id);
            // showMissions(missions);
            // editMission(missions);
            // deleteMission(missions);
          }
        });
      });
    }
    deleteMission(missions);
    // -------------------------------   DOWNLOAD FAVORITES AS PDF   --------------------------------------------------------------------------------------------------
    document.getElementById("btn_download").addEventListener("click", () => {
      const element = document.querySelector(".favorite_list");

      const opt = {
        margin: 0.5,
        filename: "favorite_missions.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf().set(opt).from(element).save();
    });
  
  } catch (error) {
    console.error("Error loading missions:", error);
  }
}

loadMissions();
