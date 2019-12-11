<template>
    <div>

        <h2>Cadastro de produto</h2>

        <form class="form" @submit.prevent="onSubmit">
            <div :class="['form-group', {'hasError' : errors.name}]">
                <div v-if="errors.name">{{ errors.name[0] }}</div>
                <input type="text" v-model="product.name" class="form-control" placeholder="Nome do produto">
            </div>

            <div :class="['form-group', {'hasError' : errors.description}]">
                <div v-if="errors.description">{{ errors.description[0] }}</div>
                <textarea v-model="product.description" class="form-control" cols="30" rows="10" placeholder="Descrição do produto"></textarea>
            </div>
            
            <div :class="['form-group', {'hasError' : errors.image}]">
                <div v-if="errors.image">{{ errors.image[0] }}</div>
                <div v-if="imagePreview">
                    <img :src="imagePreview" class="image-preview">
                    <button class="btn btn-danger" @click.prevent="removePreview">Remover</button>
                </div>
                <div v-else>
                    <input type="file" class="form-control" @change="onFileChange">
                </div>
            </div>

            <div :class="['form-group', {'hasError' : errors.category_id}]">
                <div v-if="errors.category_id">{{ errors.category_id[0] }}</div>
                <select v-model="product.category_id" class="form-control">
                    <option value="">Selecione</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary">Enviar</button>
            </div>
        </form>
        
    </div>
</template>

<script>
export default {
    props: {
        update: {
            type: Boolean,
            require: false,
            default: false
        },
        product: {
            require: false,
            type: Object,
        }
    },
    data() {
        return {
            errors: {},
            upload: null,
            imagePreview: null
        }
    },
    computed: {
        categories(){
            return this.$store.state.categories.items.data
        }
    },
    methods: {
        onSubmit(){

            let action = this.update ? 'updateProduct' : 'storeProduct'

            const formData = new FormData()
            formData.append('id', this.product.id)
            formData.append('name', this.product.name)
            formData.append('description', this.product.description)
            formData.append('category_id', this.product.category_id)

            if(this.upload != null)
                formData.append('image', this.upload)


            this.$store.dispatch(action, formData)
                .then(() => {
                    this.$snotify.success('Sucesso ao enviar!')
                    
                    this.reset()

                    this.$emit('success')
                })
                .catch(error => {
                    this.$snotify.error('Falha ao enviar!', 'Erro')

                    this.errors = error.response.data.errors
                })
        },
        reset(){
            this.errors = {}
            this.imagePreview = null
            this.upload = null
        },
        onFileChange(e){
            let files = e.target.files || e.dataTransfer.files

            if(!files.length)
                return
            
            this.upload = files[0]
            this.previewImage(files[0])
        },
        previewImage(file){
            let reader = new FileReader()
            reader.onload = (e) => {
                this.imagePreview = e.target.result
            }
            reader.readAsDataURL(file)
        },
        removePreview(){
            this.imagePreview = null
            this.upload = null
        }
    },
}
</script>

<style scoped>
.hasError{color: red;}
.hasError input{border: 1px solid red;}
.image-preview{max-width: 80px;}
</style>