<template>
  <div class="flex flex-col w-full h-full">
    <header class="flex items-center justify-between p-2 border-b">
      <button
        v-if="!isTitleEditing"
        @click="toggleTitleEdit(true)"
        class="title w-max flex gap-1 items-center text-2xl font-bold"
      >
        <span>{{ note?.title }}</span>
        <span class="title__edit material-symbols-rounded">edit</span>
      </button>
      <input
        class="w-full text-2xl font-bold outline-none"
        v-else-if="isTitleEditing"
        v-model="editTitleInput"
        @blur="toggleTitleEdit(false)"
        @keydown.enter="toggleTitleEdit(false)"
        ref="titleInput"
        type="text"
        placeholder="Enter title..."
      />
      <button
        @click="deleteNote()"
        class="aspect-square h-full flex items-center justify-center rounded-lg"
      >
        <span
          class="text-gray-300 hover:text-black transition-colors material-symbols-rounded"
          >delete</span
        >
      </button>
    </header>
    <div
      class="text-gray-400 font-light flex justify-between gap-1 p-2 text-xs border-b"
    >
      <p>Изменено: {{ getFullDate(note?.updateDt!) }}</p>
      <p>Создано: {{ getFullDate(note?.createDt!) }}</p>
    </div>
    <main class="h-full">
      <textarea
        class="block p-2 w-full h-full text-md outline-none resize-none"
        v-model="editContentInput"
        @focus="toggleContentEdit(true)"
        @blur="toggleContentEdit(false)"
        ref="contentInput"
        type="text"
        placeholder="Enter content..."
      ></textarea>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "notes",
});
import { DateTime } from "luxon";
import { useRoute } from "vue-router";
import { useNotesStore } from "~/stores/notes";
const route = useRoute();
const store = reactive(useNotesStore());

const id = route.params.id;
const note = computed(() => store.getNotes().find((n) => n.id === id));

const titleInput = ref<HTMLInputElement>();
const contentInput = ref<HTMLTextAreaElement>();

const editTitleInput = ref<string>("");
const editContentInput = ref<string>(note.value?.content!);

const isTitleEditing = ref<boolean>(false);
const isContentEditing = ref<boolean>(false);

const toggleTitleEdit = (isEditing: boolean) => {
  isTitleEditing.value = isEditing;

  if (isEditing) {
    editTitleInput.value = note.value!.title;
    setTimeout(() => {
      if (titleInput.value) {
        titleInput.value.focus();
        titleInput.value.select();
      }
    }, 0);
  } else {
    if (editTitleInput.value.length === 0) return;
    note.value!.title = editTitleInput.value;
    store.editNote(note.value!);
  }
};

const toggleContentEdit = (isEditing: boolean) => {
  isContentEditing.value = isEditing;

  if (isEditing) {
    editContentInput.value = note.value!.content;
    setTimeout(() => {
      if (contentInput.value) {
        contentInput.value.focus();
      }
    }, 0);
  } else {
    if (editContentInput.value.length === 0) return;
    note.value!.content = editContentInput.value;
    store.editNote(note.value!);
  }
};

const deleteNote = () => {
  store.deleteNote(note.value!);
  navigateTo("/notes");
};

const getFullDate = (date: string): string => {
  return (
    DateTime.fromISO(date).toLocaleString(
      DateTime.DATETIME_SHORT_WITH_SECONDS
    ) || ""
  );
};
</script>

<style lang="scss" scoped>
.title {
  &__edit {
    @apply text-gray-300;
    @apply transition-colors;
  }
}
.title:hover {
  cursor: pointer;
  .title__edit {
    @apply text-black;
  }
}
</style>
