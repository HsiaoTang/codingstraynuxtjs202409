<script setup lang="ts">
import { definePageMeta } from '~/node_modules/nuxt/dist/pages/runtime/composables';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useI18n } from 'vue-i18n';
import { useRuntimeConfig } from '~/node_modules/nuxt/dist/app';
import { ref, type Ref } from 'vue';

definePageMeta({ layout: 'empty' });

const { t } = useI18n();


interface MemberInfo {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  about: string;
  birthday: Date;
  gender: string;
  pic: File | string | null;
}

const runtimeConfig = useRuntimeConfig()

const schema = yup.object({
  username: yup
    .string()
    .required(t('error_hint.required'))
    .min(3, t('error_hint.string_min_3'))
    .max(255, t('error_hint.string_max_255')),
  password: yup
    .string()
    .required(t('error_hint.required'))
    .min(8, t('error_hint.string_min_8'))
    .matches(/[a-z]/, t('error_hint.string_contain_lower_case'))
    .matches(/[A-Z]/, t('error_hint.string_contain_upper_case')),
  confirmPassword: yup
    .string()
    .required(t('error_hint.required'))
    .min(8, t('error_hint.string_min_8'))
    .matches(/[a-z]/, t('error_hint.string_contain_lower_case'))
    .matches(/[A-Z]/, t('error_hint.string_contain_upper_case'))
    .oneOf([yup.ref('password')], t('error_hint.password_match')),
  firstName: yup
    .string()
    .required(t('error_hint.required'))
    .max(255, t('error_hint.string_max_255')),
  lastName: yup
    .string()
    .required(t('error_hint.required'))
    .max(255, t('error_hint.string_max_255')),
  email: yup
    .string()
    .email(t('error_hint.email_validate')),
  about: yup
    .string()
    .max(500, t('error_hint.string_max_500')),
  birthday: yup
    .date()
    .max(new Date(), t('error_hint.before_today')),
  gender: yup
    .string()
    .matches(/^[MF]$/, t('error_hint.before_today')),
  pic: yup
    .mixed()
    .test('fileType', t('error_hint.file_type'), (file) => {
      return file instanceof File && file.type.startsWith('image/');
    })
    .test('fileSize', t('error_hint.file_size'), (file) => {
      return file instanceof File && file.size < parseInt(runtimeConfig.public.profilePicSizeLimitMB) * 1024 * 1024;
    }),
});

const { handleSubmit, defineField, errors } = useForm<MemberInfo>({
  validationSchema: schema,
});

const [username] = defineField('username');
const [password] = defineField('password');
const [confirmPassword] = defineField('confirmPassword');
const [firstName] = defineField('firstName');
const [lastName] = defineField('lastName');
const [email] = defineField('email');
const [about] = defineField('about');
const [birthday] = defineField('birthday');
const [gender] = defineField('gender');
const [pic]  = defineField('pic');

const imageUrl: Ref<string> = ref(`${runtimeConfig.public.imgResourcesBaseUrl}/imgs/avatarPic2.png`);

const maxDateRef: Ref<string> = ref(new Date().toISOString().split('T')[0]);

const previewImage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if(target.files && target.files[0]) {
    pic.value = target.files[0];
    imageUrl.value = URL.createObjectURL(pic.value);
  };
}

const onSubmit = handleSubmit(values => {
  console.log(values);
  
});

</script>
<style lang="css" scoped>
p {
  font-size: xx-small;
  color: red;
}

label {
  font-size: smaller;
}

</style>
<template>
  <div class="grid place-content-center">
    <div class="m-12 font-bold text-green-800 text-2xl text-center">{{ t('title') }}</div>
    <div class="w-[60vw]">
      <form class="flex flex-col p-5 gap-4 w-full bg-amber-50 shadow-md border-4 border-t-green-700" @submit="onSubmit">
        
        <div class="text-[10px] text-right">{{ t('required_field') }}</div>
        
        <div class="font-bold text-xl text-center">{{ t('edit_profile') }}</div>
        
        <label>{{ `${t('username')}${t('required_symbol')}` }}</label>
        <input class="h-10 p-1 rounded-md border-2 border-gray-200 shadow-inner" v-model="username" type="text" />
        <p>{{ errors.username }}</p>
      
        <label>{{ `${t('first_name')}${t('required_symbol')}` }}</label>
        <input class="h-10 p-1 rounded-md border-2 border-gray-200 shadow-inner" v-model="firstName" type="text" />
        <p>{{ errors.firstName }}</p>
      
        <label>{{ `${t('last_name')}${t('required_symbol')}` }}</label>
        <input class="h-10 p-1 rounded-md border-2 border-gray-200 shadow-inner" v-model="lastName" type="text" />
        <p>{{ errors.lastName }}</p>
      
        <label>{{ `${t('email')}${t('required_symbol')}` }}</label>
        <input class="h-10 p-1 rounded-md border-2 border-gray-200 shadow-inner" v-model="email" type="email" />
        <p>{{ errors.email }}</p>
      
        <label>{{ t('birthday') }}</label>
        <input class="h-10 p-1 rounded-md border-2 border-gray-200 shadow-inner" v-model="birthday" type="date" :max="maxDateRef"/>
        <p>{{ errors.birthday }}</p>
      
        <label>{{ t('gender') }}</label>
        <select class="h-10 p-1 rounded-md border-2 border-gray-200 shadow-inner" v-model="gender">
          <option disabled>{{ t('placeholder.gender_select') }}</option>
          <option value="M">{{ t('male') }}</option>
          <option value="F">{{ t('female') }}</option>
        </select>
        <p>{{ errors.gender }}</p>
    
        <label>{{ t('pic') }}</label>
        <input class="h-10 p-1 rounded-md border-2 border-gray-200 shadow-inner" @change="previewImage" accept="image/*" type="file" />
        <p>{{ errors.pic }}</p>
        <img class="rounded-full place-self-center h-48 w-48 border-4 border-gray-400 object-cover" v-if="imageUrl" :src="imageUrl" />

        <label>{{ t('about') }}</label>
        <textarea class="p-1 rounded-md border-2 border-gray-200 shadow-inner" rows="5" v-model="about"></textarea>
        <p>{{ errors.about }}</p>

        <button class="h-10 rounded-lg w-1/3 text-white font-semibold bg-green-900 hover:bg-green-700 place-self-center">{{ t('confirm') }}</button>
      
      </form>
    </div>
  </div>
</template>

