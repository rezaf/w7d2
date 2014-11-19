Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li": "selectPokemonFromList"
  },

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon();
  },

  addPokemonToList: function (pokemon) {
    this.$el.append(JST["pokemonListItem"]({ pokemon: pokemon }));
  },

  refreshPokemon: function (callback) {
    this.collection.fetch({
      success: (function() {
        this.render();
        if (callback) {          
          callback();
        }
      }).bind(this)
    });
  },

  render: function () {
    this.$el.empty();
    this.collection.each(this.addPokemonToList.bind(this));
  },

  selectPokemonFromList: function (event) {
    var id = $(event.target).attr("data-id");
    Backbone.history.navigate("pokemon/" + id, { trigger: true})
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    "click li": "selectToyFromList"
  },

  refreshPokemon: function (callback) {
    this.model.fetch({
      success: (function () {
        this.render();
        if(callback) {
          callback();
        }
      }).bind(this)
    });
  },

  render: function () {
    this.$el.append(JST["pokemonDetail"]({ pokemon: this.model }));
    var $ul = this.$el.find("ul.toys");
    this.model.toys().each(function (toy) {
      $ul.append(JST["toyListItem"]({toy: toy}))
    })
  },

  selectToyFromList: function (event) {
    var toyId = $(event.target).attr("data-id");
    var pokemonId = $(event.target).attr("data-pokemon-id");
    Backbone.history.navigate("pokemon/" + pokemonId + "/toys/" + toyId, { trigger: true})
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
    // debugger
    this.$el.html(JST["toyDetail"]({ toy: this.model, pokes: new Pokedex.Collections.Pokemon()}))
  }
});

Pokedex.Views.PokemonForm = Backbone.View.extend({
  render: function () {
    this.$el.html(_)
  }
});


// $(function () {
//   var pokemonIndex = new Pokedex.Views.PokemonIndex();
//   pokemonIndex.refreshPokemon();
//   $("#pokedex .pokemon-list").html(pokemonIndex.$el);
// });

