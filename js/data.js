function todoApp() {
    //La fonction qui va gérer les données en global, c'est un fourre-tout
    return {
        taches: [],
        recherche: '', // variable pour la recherche par titre.
        newTachesTexte: '',
        newTacheDesc: '',

        // à l'init on charge les données en mémoire s'il y en a.
        init () {
            const sauvegarde = localStorage.getItem('mesTaches');
            this.taches = sauvegarde ? JSON.parse(sauvegarde) : [];

            // on ajoute un listener pour voir s'il y a des changements et les sauvegarder automatiquement
            this.$watch('taches', valeur => {
                localStorage.setItem('mesTaches', JSON.stringify(valeur));
            });
        },

        // handler pour les ajouts de tâches
        ajouterTache(titre, description) {
            if (titre.trim() === '') return; //si c'est vide on ignore
            this.taches.push({
                id: Date.now(),
                title: titre,
                desc: description,
                statut: 'a faire' // à faire, en cours, fini.
            });
        },

        //handler pour les suppressions de tâches.

        supprimerTache(id) {
            // rajout d'une confirmation avant la suppression avec la fonction native confirm()
            if (!confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
                return; // annule si jamais l'utilisateur appuie sur annuler
            }

            this.taches = this.taches.filter(t => t.id !== id) //supprimer la tâche par id.
        },

        modifierTache(id, nouveauxDetails) {
            // là, on veut l'index de la tâche à modifier
            const index = this.taches.findIndex(t => t.id === id);
            if (index !== -1) {
                // là, on fusionne les données (anciennes et nouvelles)
                this.taches[index] = { ...this.taches[index], ...nouveauxDetails };
                // on dit à Alpine "coucou, on a changé"
                this.taches = [...this.taches];
            }
        }
    }
}