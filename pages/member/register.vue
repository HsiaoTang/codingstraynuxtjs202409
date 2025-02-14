<!-- <template>
  <div>register</div>
  <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors }">
    <Field name="email" />
    <span>{{ errors.email }}</span>
    <Field name="password" type="password" />
    <span>{{ errors.password }}</span>
    <button>Submit</button>
  </Form>
</template>
<script setup lang="ts">
import { definePageMeta } from '~/node_modules/nuxt/dist/pages/runtime/composables';
import { Form, Field, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useI18n } from 'vue-i18n';

definePageMeta({ layout: 'empty' });

const { t } = useI18n();

interface MemberInfo {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  about: string;
  birthday: Date;
  gender: string;
  pic: File | null;
}

const defaultMemberInfo: MemberInfo = {
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  firstName: '',
  lastName: '',
  about: '',
  birthday: new Date(),
  gender: '',
  pic: null,
}

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().min(8, '').required(),
  confirmPassword: yup.string().min(8, '').required(),
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  about: yup.string().required(),
  birthday: yup.date().required(),
  gender: yup.string().required(),
  pic: yup.mixed<File>()
    .test('', '', (file) => {})
    .test('', '', (file) => {}),
});

// const fields = Object.fromEntries(
//   Object.entries(defaultMemberInfo).map(([key, value]) => [key, useField<typeof value>(value)])
// );
// const username = useField('username');

const { handleSubmit } = useForm({ validationSchema: schema });

const submitForm = handleSubmit((values) => {
  console.log(values);
});

</script> -->
<template>
  <form @submit="onSubmit">
    
  </form>
</template>

<script setup lang="ts">
import { definePageMeta } from '~/node_modules/nuxt/dist/pages/runtime/composables';

definePageMeta({ layout: 'empty' });

import { useForm } from 'vee-validate';
import * as yup from 'yup';

interface MemberInfo {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  about: string;
  birthday: Date;
  gender: string;
  pic: File | null;
}

const schema = yup.object({
  username: yup.string().required().max(32, 'message2'),
  password: yup.string().required('message1'),
});

const { handleSubmit, defineField, errors } = useForm<MemberInfo>({
  validationSchema: schema,
});



const onSubmit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2));
});

</script>

