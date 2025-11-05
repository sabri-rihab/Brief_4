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

    const favorite_list = document.querySelector(".favorite_list");

    let favorites = [];

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

    // initial render
    showMissions(missions);

    // popups
    open_favorite.addEventListener("click", () => {
      popUp_favorite.classList.toggle("show");
      popUp_Add.classList.remove("show");
    });
    open_Add.addEventListener("click", () => {
      popUp_Add.classList.toggle("show");
      popUp_favorite.classList.remove("show");
    });

    document.body.addEventListener("click", (e) => {
      if (e.target.classList.contains("close_icon")) {
        popUp_favorite.classList.remove("show");
        popUp_Add.classList.remove("show");
      }
    });

    // ---------- Event delegation for cards (favorite / edit / delete) ----------
    container.addEventListener("click", (e) => {
      const clicked = e.target;
      const card = clicked.closest(".card");
      if (!card) return; // clicked outside a card

      const id = parseInt(card.id, 10);
      const missionIndex = missions.findIndex((m) => m.id === id);
      const mission = missions[missionIndex];

      // Favorite toggle (heart icon)
      if (clicked.classList.contains("material-icons")) {
        if (!mission) return;
        const cardFavExists = favorite_list.querySelector(`#fav-${mission.id}`);
        if (card.classList.contains("favorite")) {
          // remove favorite
          card.classList.remove("favorite");
          favorites = favorites.filter((f) => f.id !== mission.id);
          if (cardFavExists) cardFavExists.remove();
        } else {
          // add favorite
          card.classList.add("favorite");
          if (!favorites.some((f) => f.id === mission.id)) {
            favorites.push(mission);
            favorite_list.insertAdjacentHTML(
              "beforeend",
              `
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
                </div>
              </div>`
            );
          }
        }
      }

      // Edit button
      if (clicked.classList.contains("btn_edit")) {
        if (!mission) return;
        add_btn.disabled = true;
        edit_btn.disabled = false;
        popUp_Add.classList.add("show");

        new_name.value = mission.name || "";
        new_dsc.value = mission.objective || "";
        new_agency.value = mission.agency || "";
        new_date.value = mission.launchDate || "";
        new_img.value = "";

        // set up edit save handler once (replace previous)
        edit_btn.onclick = () => {
          mission.name = new_name.value;
          mission.objective = new_dsc.value;
          mission.agency = new_agency.value;
          mission.launchDate = new_date.value;
          if (new_img.files && new_img.files.length > 0) {
            mission.image = URL.createObjectURL(new_img.files[0]);
          }
          showMissions(missions);
          // keep favorites synced: if mission was favorite, update its fav card image/text if needed
          const favCard = favorite_list.querySelector(`#fav-${mission.id}`);
          if (favCard) {
            favCard.querySelector("img").src = mission.image;
            favCard.querySelector(".name_m").textContent = mission.name;
            favCard.querySelectorAll(".detail_m")[0].textContent = mission.objective;
            favCard.querySelectorAll(".detail_m")[1].textContent = mission.launchDate;
            favCard.querySelector("a").textContent = mission.agency;
          }

          add_btn.disabled = false;
          edit_btn.disabled = true;
          new_name.value = "";
          new_dsc.value = "";
          new_agency.value = "";
          new_img.value = "";
          new_date.value = "";
          popUp_Add.classList.remove("show");
        };
      }

      // Delete button
      if (clicked.classList.contains("btn_delete")) {
        const confirmDelete = window.confirm("Are you sure you want to delete this mission?");
        if (!confirmDelete) return;

        if (missionIndex !== -1) {
          // remove from missions array
          missions.splice(missionIndex, 1);

          // also remove from favorites array and favorite_list UI if present
          favorites = favorites.filter((f) => f.id !== id);
          const favCard = favorite_list.querySelector(`#fav-${id}`);
          if (favCard) favCard.remove();

          // re-render
          showMissions(missions);
        }
      }
    });

    // ---------- favorite_list delegation (remove button) ----------
    favorite_list.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove")) {
        const cardFav = e.target.closest(".cardFav");
        if (!cardFav) return;
        const id = parseInt(cardFav.id.replace("fav-", ""), 10);
        favorites = favorites.filter((f) => f.id !== id);
        cardFav.remove();
        const originalCard = document.getElementById(id);
        if (originalCard) originalCard.classList.remove("favorite");
      }
    });

    // -------------------------------   FILTER   -----------------------------------
    function FilterMissions(missionsArray) {
      const agency = agencyFilter.value;
      const date = dateFilter.value;
      let filtered = missionsArray.slice(); // copy

      const value = search.value.toLowerCase();
      if (value) {
        filtered = filtered.filter(
          (mission) =>
            (mission.name || "").toLowerCase().includes(value) ||
            (mission.objective || "").toLowerCase().includes(value)
        );
      }

      if (agency) {
        filtered = filtered.filter((mission) => mission.agency === agency);
      }

      if (date === "before_2000") {
        filtered = filtered.filter((mission) => mission.launchDate < "2000-01-01");
      } else if (date === "in_2000s") {
        filtered = filtered.filter(
          (mission) => mission.launchDate >= "2000-01-01" && mission.launchDate <= "2030-12-31"
        );
      } else if (date === "after_2030") {
        filtered = filtered.filter((mission) => mission.launchDate > "2030-12-31");
      }

      showMissions(filtered);
    }

    document.querySelector(".clear-filter").addEventListener("click", (e) => {
      e.preventDefault();
      agencyFilter.value = "";
      dateFilter.value = "";
      search.value = "";
      showMissions(missions);
    });

    agencyFilter.addEventListener("change", () => FilterMissions(missions));
    dateFilter.addEventListener("change", () => FilterMissions(missions));
    search.addEventListener("input", () => FilterMissions(missions));

    // -------------------------------   ADD   -----------------------------------
    (function addMission() {
      let ids = Math.max(0, ...missions.map(m => Number(m.id))) + 1;
      add_btn.addEventListener("click", () => {
        const mission = {
          id: ids++,
          name: new_name.value,
          objective: new_dsc.value,
          agency: new_agency.value,
          image: new_img.files && new_img.files[0] ? URL.createObjectURL(new_img.files[0]) : "",
          launchDate: new_date.value,
        };
        missions.push(mission);
        showMissions(missions);
        new_name.value = "";
        new_dsc.value = "";
        new_agency.value = "";
        new_img.value = "";
        new_date.value = "";
      });
    })();

    // -------------------------------   DOWNLOAD FAVORITES AS PDF   ---------------
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

    // initial bindings already done; keep UI in sync
    FilterMissions(missions);

  } catch (error) {
    console.error("Error loading missions:", error);
  }
}

loadMissions();