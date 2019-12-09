import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import todos from './modules/todos';

Vue.use(Vuex);
Vue.use(firebase);


export default new Vuex.Store({
    modules: {
        todos
    },
    state: {
        loadProjects: [
            {
                imageUrl: "/avatar-1.png",
                id: 1,
                title: "Image 1",
                date: '2019-11-10'
            },
            { imageUrl: "/avatar-2.png", id: 2, title: "Image 2", date: '2019-11-11' },
            { imageUrl: "/avatar-3.png", id: 3, title: "Image 3", date: '2019-11-12' },
            { imageUrl: "/avatar-4.png", id: 4, title: "Image 4", date: '2019-11-13' }
        ],
        user: null,
        loading: false,
        error: null
    },
    getters: {
        loadProjects(state) {
            return state.loadProjects.sort((projectA, projectB) => {
                return projectA.date > projectB.date;
            });
        },
        loadProject(state) {
            return (projectId) => {
                return state.loadProjects.find((project) => {
                    return project.id == projectId;
                });
            };
        },
        featuredProjects(state, getters) {
            return getters.loadProjects.slice(0, 5);
        },
        user(state) {
            return state.user;
        },
        loading(state) {
            return state.loading;
        },
        error(state) {
            return state.error;
        }
    },
    actions: {
        loadProjects({ commit }) {
            commit('setLoading', true);
            firebase.database().ref('projects').once('value')
                .then((data) => {
                    const projects = [];
                    const obj = data.val();
                    for (let key in obj) {
                        projects.push({
                            id: key,
                            title: obj[key].title,
                            imageUrl: obj[key].imageUrl,
                            person: obj[key].person,
                            details: obj[key].details,
                            status: obj[key].status,
                            date: obj[key].date,
                            creatorId: obj[key].creatorId
                        });
                    }
                    commit('setLoadProjects', projects);
                    commit('setLoading', false);
                });
            // .catch(
            //     (error) => {
            //     //   console.log(error);
            //       commit('setLoading', false);
            //     }
            //   );
        },
        createProject({ commit, getters }, payload) {
            const project = {
                title: payload.title,
                imageUrl: payload.imageUrl,
                person: payload.person,
                details: payload.details,
                status: payload.status,
                date: payload.date,
                creatorId: getters.user.id
            };
            firebase.database().ref('projects').push(project)
                .then((data) => {
                    const key = data.key;
                    commit('createProject', {
                        ...project,
                        id: key
                    });
                });
            //   .catch((error) => {
            //     console.log(error);
            //   });
            // Reach out to firebase and store it
            commit('createProject', project);
        },
        signUserUp({ commit }, payload) {
            commit('setLoading', true);
            commit('clearError');
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false);
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: []
                        };
                        commit('setUser', newUser);
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false);
                        commit('setError', error);
                        // console.log(error);
                    }
                );
        },
        signUserIn({ commit }, payload) {
            commit('setLoading', true);
            commit('clearError');
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false);
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: []
                        };
                        commit('setUser', newUser);
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false);
                        commit('setError', error);
                        // console.log(error);
                    }
                );
        },
        autoSignIn({ commit }, payload) {
            commit('setUser', { id: payload.uid, registeredMeetups: [] });
        },
        logout({ commit }) {
            firebase.auth().signOut();
            commit('setUser', null);
        },
        clearError({ commit }) {
            commit('clearError');
        }
    },
    mutations: {
        setLoadProjects(state, payload) {
            state.loadProjects = payload;
        },
        createProject(state, payload) {
            state.loadProjects.push(payload);
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setLoading(state, payload) {
            state.loading = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
        clearError(state) {
            state.error = null;
        }
    },

});