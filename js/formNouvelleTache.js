// ce handler intervient quand on appuie sur le bouton "Ajouter une tâche"
// on l'a un peu modifié pour la réutiliser lorsque l'on veut modifier une tâche.

window.formHandler = function() {
    return {
        show: false,
        modifId: null, // si c'est null c'est de l'ajout de tâche, si ça contient un ID, on modifie une tâche.
        formData: { title: '', desc: '', statut: 'a faire'},

        // là, on pré remplit le formulaire
        ouvrirPourModification(tache) {
            this.modifId = tache.id;
            this.formData.title = tache.title;
            this.formData.desc = tache.desc;
            this.formData.statut = tache.statut;
            this.show = true;
        },

        submitForm() {
            if (this.modifId) {
                this.$dispatch('tache-modifiee', {
                    id: this.modifId,
                    details: {
                        title: this.formData.title,
                        desc: this.formData.desc,
                        statut: this.formData.statut
                    }
                });
            } else {
                this.$dispatch('tache-ajoutee', {
                    titre: this.formData.title,
                    description: this.formData.desc
                });
            }
            this.reset();
        },

        reset() {
            this.show = false;
            this.modifId = null;
            this.formData = { title: '', desc: '' };
        }
    }
}