// import axios from 'axios';
import { db } from "@/main";
//import firebase from 'firebase/app';

const state = {
    todos: []
};

const getters = {
    allTodos: (state) => state.todos
};

const actions = {
    fetchTodos({ commit }) {
        db.collection("projects").onSnapshot(res => {
            const changes = res.docChanges();
            changes.forEach(change => {
                if (change.type === "added") {
                    this.projects.push({
                        ...change.doc.data(),
                        id: change.doc.id
                    });
                }
            });
            commit('setTodos', res.doc.data);
        });

    }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos)
};

export default {
    state, getters, actions, mutations
};
