import apiClient from "../../resources/baseUrl";
export default {
  state: {
    zones: [],
  },
  mutations: {
    setZones(state, zones) {
      state.zones = zones;
    },
  },
  getters: {
    zones(state) {
      return state.zones;
    },
  },
  actions: {
    async fetchZones(context) {
      context.isLoading = true;
      try {
        var response = await apiClient.get("/api/zones");
        if (response.status === 200) {
          context.commit("setZones", response.data);
        } else {
          throw "faild to load degree department";
        }
      } finally {
        context.isLoading = false;
      }
    },
    async addZone(context, payload) {
      context.isLoading = true;
      var response = await apiClient.post(
        "/api/zones",
        JSON.stringify(payload)
      );
      if (response.status === 201) {
        var previousData = context.getters.zones;
        previousData.push(response.data);
        context.commit("setZones", previousData);
      } else {
        throw "faild to add";
      }
    },
    async updateZone(context, payload) {
      var response = await apiClient.put(
        "/api/zones/" + payload.id,
        JSON.stringify(payload)
      );
      if (response.status === 200) {
        var previousData = context.getters.zones;
        const editedIndex = previousData.findIndex((zone) => {
          return zone.id === payload.id;
        });
        previousData[editedIndex] = response.data;
        context.commit("setZones", previousData);
      } else {
        throw "faild to update zone";
      }
    },
    async deleteZone(context, payload) {
      var response = await apiClient.delete("/api/zones/" + payload);
      if (response.status === 200) {
        var previousData = context.getters.zones;
        const deletedIndex = previousData.findIndex((zone) => {
          return zone.id === payload;
        });
        previousData.splice(deletedIndex, 1);
        context.commit("setZones", previousData);
      } else {
        throw "faild to  delete zone";
      }
    },
  },
};
