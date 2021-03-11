
<template>
  <div class="home" :class="{ DarkMode : isDarkMode }">

    <div class="SearchBar">
      <div class="SearchContainer">
        <i class="fas fa-Search SearchIcon"></i>
        <input 
          class="SearchInput" 
          type="text" 
          v-model="Search"
          aria-label="Search for a country"
          placeholder="Search for a country"
        />
        <ul class="SearchResults"></ul>
      </div>

      <div class="DropdownDiv">
        <a 
          class="DropdownBtn" 
          v-if="!showAllRegion" 
          v-on:click="showFilter = !showFilter">
            Filter by Region 
        </a>

        <a 
          class="DropdownBtn" 
          v-else
          v-on:click="showFilter = !showFilter">
            {{ region }} 
        </a>

        <ul v-if="showFilter" class="DropdownUL">
          <li>
            <label for="radioAfrica">Africa
            <input 
              id="radioAfrica" 
              class="DropdownInput" 
              type="radio" 
              name="africa" 
              value="Africa" 
              v-model="region" 
              v-on:click="handleFilterClick"
            />
            </label>
          </li>
          <li>
            <input 
              id="radioAmerica" 
              class="DropdownInput" 
              type="radio" 
              name="america" 
              value="America" 
              v-model="region" 
              v-on:click="handleFilterClick"
            />
            <label for="radioAmerica">America</label>
          </li>
          <li>
            <input 
              id="radioAsia" 
              class="DropdownInput" 
              type="radio" 
              name="asia" 
              value="Asia" 
              v-model="region" 
              v-on:click="handleFilterClick"
            />
            <label for="radioAsia">Asia</label>
          </li>
          <li>
            <input 
              id="radioEurope" 
              class="DropdownInput" 
              type="radio" 
              name="europe" 
              value="Europe" 
              v-model="region" 
              v-on:click="handleFilterClick"
            />
            <label for="radioEurope">Europe</label>
          </li>
          <li>
            <input 
              id="radioOceania" 
              class="DropdownInput" 
              type="radio" 
              name="oceania" 
              value="Oceania" 
              v-model="region" 
              v-on:click="handleFilterClick"
            />
            <label for="radioOceania">Oceania</label>
          </li>

          <li v-if="showAllRegion">
            <input 
              id="radioAll" 
              class="DropdownInput" 
              type="radio" 
              name="all" 
              value="All Regions" 
              v-model="region" 
              v-on:click="handleFilterClick"
            />
            <label for="radioAll">All</label>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="countryInfo" class="tileGrid">
      <div v-for="country in filteredCountries" class="countryTile" v-bind:key="country.id">
        <router-link 
          :to="{ name: 'country-detail', params: {country: country.name }}" 
          class="linkTile"
        >
          <img v-bind:src="country.flag" alt="Country Flag" class="flag">
          <div class="text">
            <h1>{{ country.name }}</h1>
            <p><span>Population: </span>{{ country.population | formatNumbers }}</p>
            <p><span>Region: </span> {{ country.region }}</p>
            <p><span>Capital: </span> {{ country.capital }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'home',

  props: [ 'isDarkMode' ],
  data () {
    return {

      pending: false,
      error: null,
      countryInfo: null,
      Search: '',
      showFilter: false,
      showAllRegion: false,
      region: '',
      darkMode: false,
    }
  },
  mounted () {
    this.pending = true;
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => (this.countryInfo = response.data))
      .catch(error => (this.error = error ))
      .finally( () => { this.pending = false });
  },
  filters: {
    formatNumbers (value) {
      return `${value.toLocaleString()}`
    }
  },
  computed: {
    filteredCountries: function () {
      return this.countryInfo.filter((country) => {
        if (this.region === '' || this.region === 'All Regions') {
          return country.name.toLowerCase().match(this.Search.toLowerCase());
        } else if (this.Search !== '') {
          return country.name.toLowerCase().match(this.Search.toLowerCase());
        } else {
          return country.region.match(this.region);
        }
      })
    }
  },
 methods: {
    handleFilterClick () {
      setTimeout(() => {
        this.showFilter = !this.showFilter;
        this.showAllRegion = true;
      })
    }
  }
}
</script>

<style scoped>

.home {
  background-color: #f9f9f9;
}

.SearchBar {
  padding: 35px 75px;
  display: flex;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
}

.SearchContainer {
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 7px 0px rgb(0, 0, 0, 0.1);
  width: 500px;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding-left: 30px;
}

.SearchIcon {
  font-size: 16px;
  color: #848484;
  padding-right: 30px;
}

.SearchInput {
  border: none;
  font-size: 14px;
  font-family: 'Nunito Sans', sans-serif;
  width: 420px;
}

.DropdownBtn {
  display: block;
  background: #fff;
  height: 50px;
  width: 160px;
  box-shadow: 1px 1px 7px 0px rgb(0, 0, 0, 0.1);
  padding-right: 30px;
  padding-left: 30px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.DropdownBtn::after {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f107";
}

.DropdownUL {
  padding-left: 0;
  text-align: left;
  background-color: #fff;
  margin-top: 3px;
  padding: 10px 0; 
  box-shadow: 1px 1px 7px 0px rgb(0, 0, 0, 0.1);
  border-radius: 3px;
  position: absolute;
  width: 220px;
}

.DropdownUL li {
  list-style: none;
  line-height: 2;
  cursor: pointer;
}

.DropdownUL li label {
  cursor: pointer;
  padding: 0 26px;
  display: block;
  width: 148px;
}

.DropdownUL li:hover {
  background-color: #f9f9f9;
}

.DropdownInput {
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute;
}

input[type="radio"] {
  -webkit-appearance: radio;
}


.tileGrid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 25px 50px 0;
  margin: 0 auto;
  max-width: 1450px;
}

.countryTile {
  display: inline-block;
  background-color: #fff;
  width: 300px;
  box-shadow: 1px 1px 7px 0px rgb(0, 0, 0, 0.1);
  border-radius: 3px;
  cursor: pointer;
  text-align: left;
  margin: 0 25px 80px;
  text-decoration: none;
  color: inherit;
}

.linkTile {
  display: inline-block;
  width: 300px;
  height: 365px;
  text-decoration: none;
  color: inherit;
}

.flag {
  height: 200px;
  width: 300px;
  border-radius: 3px 3px 0 0;
}

.text {
  padding-left: 30px;
  padding-right: 20px;
}

.text h1 {
  font-size: 20px;
}

.text p span {
  font-weight: 600;
}

.text p {
  line-height: 1;
}

::placeholder {
  font-weight: 600;
}

.DarkMode,
.DarkMode .DropdownUL li:hover  {
  background-color: #202c36;
}

.DarkMode .SearchContainer, 
.DarkMode .SearchInput,
.DarkMode .DropdownBtn,
.DarkMode .DropdownUL,
.DarkMode .countryTile {
  background-color: #2b3845;
}

.DarkMode h1,
.DarkMode p,
.DarkMode .SearchIcon, 
.DarkMode .SearchInput, 
.DarkMode ::placeholder,
.DarkMode .DropdownBtn,
.DarkMode .DropdownUL {
  color: #fff;
}

@media (max-width: 875px) {
  .tileGrid {
    justify-content: center;
    padding-left: 50px;
  }

  .SearchBar {
    flex-direction: column;
    padding: 25px 15px;
  }

  .SearchContainer {
    width: inherit;
  }

  .DropdownDiv {
    margin-top: 40px;
  }
}

</style>
