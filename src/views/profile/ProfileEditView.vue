<script lang="ts" setup>
import useDateFormatter from '@/composables/FormatDate';
import type { UserType } from '@/types/UserType';
import { ref, onMounted } from 'vue';


const { formatDate } = useDateFormatter();
const user = ref<UserType>();

onMounted(() => {
  user.value
});

const udapteProfile = () => {
  //...
}


</script>

<template>
<div class="container edit-user-profile">
    <div class="row">

        <div class="col-md-8 col-md-offset-2 user-data">

			<form @submit.prevent="udapteProfile">
			<h3>
				{{ user.first_name }} {{ user.last_name }}
			</h3>
			<p><b>Tipi: </b><span>{{ user.type }}</span></p>
			<p><b>Emaili:</b> {{ user.email }}</p>
			
			<p><b>Profil i verifikuar:</b> {{ (user.verified == '0' ? 'Jo' : 'Po') }}</p>
			
			<p><b>Profili u Krijua me:</b> {{ user.created_at->format('d-m-Y') }}</p>


			<p><b>Data Lindjes: </b> {{ formatDate(user.created_at) }}</p> 

			<div class="col-md-2">
				<h4><b>Gjinia:</b></h4>
			</div>
			<div class="col-md-10">
				<div class="form-group">
					<select class="form-control" name="gjinia" >
						<option value="">Gjinia</option>
						<option value="M" {{ user.gjinia == "M" ? 'selected="selected"' : '' }}>Mashkull</option>
						<option value="F" {{ user.gjinia == "F" ? 'selected="selected"' : '' }}>Femër</option>
					</select>
				</div>
			</div>
			
			<div class="col-md-2">
				<h4><b>Adresa:</b></h4>
			</div>
			<div class="col-md-10">
				<div class="form-group">
					<input type="text" class="form-control" name="adresa" placeholder="Adresa" value="{{ user.adresa }}">
				</div>
			</div>
			
			<div class="col-md-2">
				<h4><b>Shteti:</b></h4>
			</div>
			<div class="col-md-10">
				<div class="form-group">
					<select class="form-control" id="country" name="shteti">
							<option value=""></option>
							<option value="" ></option>
						</select>
				</div>
			</div>

			<div class="col-md-2">
				<h4><b>Shkollimi:</b></h4>
			</div>
			<div class="col-md-10">
				<div class="form-group">
					<input type="text" class="form-control" name="shkollimi" placeholder="Shkollimi" value="{{ user.shkollimi }}">
				</div>
			</div>
			
			<div class="col-md-2">
				<h4><b>Vendëlindja:</b></h4>
			</div>
			<div class="col-md-10">
				<div class="form-group">
					<input type="text" class="form-control" name="vendlindja" placeholder="Vendëlindja" value="{{ user.vendlindja }}">
				</div>
			</div>
			
			<div class="col-md-2">
				<h4><b>Hobby:</b></h4>
			</div>
			<div class="col-md-10">
				<div class="form-group">
					<input type="text" class="form-control" name="hobby" placeholder="Hobby" value="{{ user.hobby }}">
				</div>
			</div>
			
			<div class="form-group">
                	<button type="submit" class="btn btn-primary pull-right cleftButton" name="submit" id="submit"><i class="fa fa-save"></i> &nbsp; Ruaje</button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>