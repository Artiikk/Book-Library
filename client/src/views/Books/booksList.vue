<template>
  <div>
    <Header />
    <v-container>
      <v-layout class="content flex-column align-center">
        <div class="w-100 mb-10">
          <v-card outlined>
            <v-card-title class="new-book-title">
              Add a new book to your list
            </v-card-title>

            <v-text-field
              clearable
              v-model="bookTitle"
              class="pa-10"
              id="newBook"
              name="newBook"
              label="Type book title"
              @keyup.enter="addBook"
            ></v-text-field>

            <v-text-field
              clearable
              v-model="bookAuthor"
              class="mt-n10 px-10"
              id="bookAuthor"
              name="bookAuthor"
              label="Type book author"
              @keyup.enter="addBook"
            ></v-text-field>

            <v-btn elevation="2" class="d-flex mx-auto mb-4" @click="addBook">
              Add book
            </v-btn>
          </v-card>
        </div>

        <div class="w-100">
          <v-card outlined v-if="books.length">
            <v-list-item v-for="(book, i) in books" :key="i">
              <v-list-item-content class="flex-nowrap pt-1 pb-1">
                <v-checkbox
                  v-model="book.wasRead"
                  class="ml-3 mr-3"
                  @change="readBook(book.id, book.wasRead)"
                  :dark="isDark"
                ></v-checkbox>

                <v-list-item-content>
                  <v-list-item-title
                    :class="{ done: book.wasRead }"
                    class="text-h6"
                  >
                    {{ ++i }}. {{ book.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ book.author | capitalize }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="date">
                    {{ book.createdAt | date }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item-content>

              <v-btn
                fab
                small
                color="transparent"
                class="delete-button"
                @click="removeBook(book.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item>
          </v-card>
        </div>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Header from "@/layout/header";
import axios from '@/http'

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      isDark: false,
      bookTitle: "",
      bookAuthor: "",
      books: [],
    };
  },
  // async mounted() {
  //   const res = await axios.get("http://localhost:3000/api/books");

  //   const books = await res.json();
  //   this.books = books;
  // },
  methods: {
    async addBook() {
      const bookTitle = this.bookTitle.trim();
      const bookAuthor = this.bookAuthor.trim();

      if (!bookTitle || !bookAuthor) return;

      const res = await axios.post("http://localhost:3000/api/books", {
        title: bookTitle, author: bookAuthor,
      });
      const { book } = await res.json();

      this.books.push(book);
      this.bookTitle = "";
      this.bookAuthor = "";
    },
    async removeBook(id) {
      await axios.delete("http://localhost:3000/api/books/" + id);
      this.books = this.books.filter((el) => el.id !== id);
    },
    async readBook(id, wasRead) {
      await axios.put("http://localhost:3000/api/books/" + id, { wasRead });
    },
  },
  filters: {
    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1);
    },
    date(value) {
      return new Intl.DateTimeFormat("en-EN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(value));
    },
  },
};
</script>

<style scoped lang='scss'>
.done {
  text-decoration: line-through;
}
[v-cloak] {
  display: none;
}
.dots-button {
  min-width: initial !important;
  height: 36px !important;
  width: 36px;
  border-radius: 50%;
}
.content {
  max-width: 600px;
  margin: 0 auto;
}
.w-100 {
  width: 100%;
}
.new-book-title {
  margin: 0 auto;
  width: fit-content;
}
.date {
  font-size: 9px;
  margin-top: 3px;
}
.delete-button {
  box-shadow: none !important;
  i {
    color: rgb(255, 42, 42) !important;
  }
}
</style>