Pokedex.Router = Backbone.Router.extend({
  routes: {
    "": "pokemonIndex",
    "pokemon/new": "pokemonForm"
    "pokemon/:id": "pokemonDetail",
    "pokemon/:pokemonId/toys/:toyId": "toyDetail"
  },
  
  pokemonForm: function () {
    var pokemon = Pokedex.Model.Pokemon();
  },
  
  pokemonDetail: function (id, callback) {
    if (this._pokemonIndex) {
      var pokemon = this._pokemonIndex.collection.get(id);
      this._pokemonDetail = new Pokedex.Views.PokemonDetail({ model: pokemon });
      $("#pokedex .pokemon-detail").html(this._pokemonDetail.$el);
      this._pokemonDetail.refreshPokemon(callback);
    } else {
      this.pokemonIndex(function () {
        this.pokemonDetail(id, callback);
      }.bind(this))
    }
  },

  pokemonIndex: function (callback) { 
    this._pokemonIndex = new Pokedex.Views.PokemonIndex();
    this._pokemonIndex.refreshPokemon(callback);
    $("#pokedex .pokemon-list").html(this._pokemonIndex.$el);
  },

  toyDetail: function (pokemonId, toyId) {
    if (this._pokemonDetail) {
      var toy = this._pokemonDetail.model.toys().get(toyId);
      var toyDetail = new Pokedex.Views.ToyDetail({ model: toy });
      $("#pokedex .toy-detail").html(toyDetail.$el);
      toyDetail.render();
    } else {
      this.pokemonDetail(pokemonId, 
        this.toyDetail.bind(this, pokemonId, toyId)
      );
    }
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});

