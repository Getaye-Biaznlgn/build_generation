import apiClient from "../../resources/baseUrl";
export default {
  state: {
    regions: [],
  },
  mutations: {
    setRegions(state, regions) {
      state.regions = regions;
    },
  },
  getters: {
    regions(state) {
      return state.regions;
    },
  },
  actions: {
    async fetchRegions(context) {
      context.commit("setIsLoading", true);
      context.isLoading = true;
      try {
        var response = await apiClient.get("/api/regions");
        if (response.status === 200) {
          context.commit("setRegions", response.data);
        } else {
          throw "faild to load degree department";
        }
      } finally {
        context.commit("setIsLoading", false);
      }
    },
    async addRegion(context, payload) {
      var response = await apiClient.post(
        "/api/regions",
        JSON.stringify(payload)
      );
      if (response.status === 201) {
        var previousData = context.getters.regions;
        previousData.push(response.data);
        context.commit("setRegions", previousData);
      } else {
        throw "faild to add";
      }
    },
    async updateRegion(context, payload) {
      var response = await apiClient.put(
        "/api/regions/" + payload.id,
        JSON.stringify(payload)
      );
      if (response.status === 200) {
        var previousData = context.getters.regions;
        const editedIndex = previousData.findIndex((region) => {
          return region.id === payload.id;
        });
        previousData[editedIndex] = response.data;
        context.commit("setRegions", previousData);
      } else {
        throw "faild to update region";
      }
    },
    async deleteRegion(context, payload) {
      var response = await apiClient.delete("/api/regions/" + payload);
      if (response.status === 200) {
        var previousData = context.getters.regions;
        const deletedIndex = previousData.findIndex((region) => {
          return region.id === payload;
        });
        previousData.splice(deletedIndex, 1);
        context.commit("setRegions", previousData);
      } else {
        throw "faild to  delete region";
      }
    },
  },
};
