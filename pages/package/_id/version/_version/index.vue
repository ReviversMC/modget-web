<template>
  <div>
    <ConfirmPopup
      ref="delete_file_popup"
      title="Are you sure you want to delete this file?"
      description="This will remove this file forever (like really forever)"
      :has-to-type="false"
      proceed-label="Delete file"
      @proceed="deleteFile(popup_data)"
    />
    <ConfirmPopup
      ref="delete_version_popup"
      title="Are you sure you want to delete this version?"
      description="This will remove this version forever (like really forever), and if some mods depends on this version, it won't work anymore."
      :has-to-type="false"
      proceed-label="Delete version"
      @proceed="deleteVersion()"
    />
    <div class="version">
      <div class="version-header">
        <h4>{{ modpackage.name }} {{ version.version }}</h4>
        <span
          v-if="version.channel.toLowerCase() === 'release'"
          class="badge green"
        >
          Release
        </span>
        <span
          v-if="version.channel.toLowerCase() === 'beta'"
          class="badge yellow"
        >
          Beta
        </span>
        <span
          v-if="version.channel.toLowerCase() === 'alpha'"
          class="badge red"
        >
          Alpha
        </span>
        <Categories :categories="version.loaders" />
        <div class="buttons">
          <nuxt-link
            v-if="this.$auth.user"
            :to="`/report/create?id=${version.version}&t=version`"
            class="action iconified-button"
          >
            <ReportIcon />
            Report
          </nuxt-link>
          <button
            v-if="currentMember"
            class="action iconified-button"
            @click="deleteVersionPopup"
          >
            <TrashIcon />
            Delete
          </button>
          <nuxt-link
            v-if="currentMember"
            class="action iconified-button"
            :to="version.id + '/edit'"
          >
            <EditIcon />
            Edit
          </nuxt-link>
        </div>
      </div>
      <div class="stats">
        <!-- <div class="stat">
          <DownloadIcon />
          <div class="info">
            <h4>Downloads</h4>
            <p class="value">{{ version.downloads }}</p>
          </div>
        </div> -->
        <!-- <div class="stat">
          <CalendarIcon />
          <div class="info">
            <h4>Created</h4>
            <p
              v-tooltip="
                $dayjs(version.date_published).format(
                  '[Created on] YYYY-MM-DD [at] HH:mm A'
                )
              "
              class="value"
            >
              {{ $dayjs(version.date_published).fromNow() }}
            </p>
          </div>
        </div> -->
        <div class="stat">
          <TagIcon />
          <div class="info">
            <h4>Available for</h4>
            <p class="value">
              {{
                version.minecraftVersions
                  ? version.minecraftVersions.join(', ')
                  : ''
              }}
            </p>
          </div>
        </div>
        <div v-if="version.environment.client" class="stat">
          <ClientIcon />
          <div class="info">
            <h4>Client Side</h4>
            <p class="value capitalize">
              {{ version.environment.client.toLowerCase() }}
            </p>
          </div>
        </div>
        <div v-if="version.environment.server" class="stat">
          <ServerIcon />
          <div class="info">
            <h4>Server Side</h4>
            <p class="value capitalize">
              {{ version.environment.server.toLowerCase() }}
            </p>
          </div>
        </div>
        <div class="stat">
          <FileTextIcon />
          <div class="info">
            <h4>License</h4>
            <p class="value ellipsis">
              {{ version.license.toUpperCase() }}
            </p>
          </div>
        </div>
        <div class="stat">
          <StorageCategory />
          <div class="info">
            <h4>File Type</h4>
            <p class="value ellipsis">
              {{ version.fileType.toUpperCase() }}
            </p>
          </div>
        </div>
      </div>
      <div
        v-compiled-markdown="version.changelog ? version.changelog : ''"
        class="markdown-body"
      ></div>
      <div class="files">
        <div v-if="version.downloadPageUrls.modrinth" class="file">
          <div class="text-wrapper">
            <p>Modrinth</p>
            <div v-if="currentMember" class="actions">
              <button @click="deleteFilePopup(file.hashes.sha1)">
                Delete file
              </button>
            </div>
          </div>
          <a target="_blank" :href="version.downloadPageUrls.modrinth">
            <DownloadIcon />
          </a>
        </div>
        <div v-if="version.downloadPageUrls.curseforge" class="file">
          <div class="text-wrapper">
            <p>CurseForge</p>
            <div v-if="currentMember" class="actions">
              <button @click="deleteFilePopup(file.hashes.sha1)">
                Delete file
              </button>
            </div>
          </div>
          <a target="_blank" :href="version.downloadPageUrls.curseforge">
            <DownloadIcon />
          </a>
        </div>
        <div v-if="version.downloadPageUrls.sourceControl" class="file">
          <div class="text-wrapper">
            <p>Source Control</p>
            <div v-if="currentMember" class="actions">
              <button @click="deleteFilePopup(file.hashes.sha1)">
                Delete file
              </button>
            </div>
          </div>
          <a target="_blank" :href="version.downloadPageUrls.sourceControl">
            <DownloadIcon />
          </a>
        </div>
        <div
          v-for="downloadPageUrl in version.downloadPageUrlsWithOnlyNamesAndUrls"
          :key="downloadPageUrl.url"
          class="file"
        >
          <div class="text-wrapper">
            <p>{{ downloadPageUrl.name }}</p>
            <div v-if="currentMember" class="actions">
              <button @click="deleteFilePopup(file.hashes.sha1)">
                Delete file
              </button>
            </div>
          </div>
          <a :href="downloadPageUrl.url">
            <DownloadIcon />
          </a>
        </div>
      </div>
      <div style="margin-top: 1.2rem">
        <span style="font-weight: var(--font-weight-bold)">MD5</span>:
        {{ version.md5 }}
      </div>
      <FileInput
        v-if="currentMember"
        accept=".jar,application/java-archive,application/x-java-archive"
        multiple
        prompt="Choose files or drag them here"
        class="file-input"
        @change="addFiles"
      />
    </div>
  </div>
</template>
<script>
import ConfirmPopup from '~/components/ui/ConfirmPopup'

import Categories from '~/components/ui/search/Categories'
import FileInput from '~/components/ui/FileInput'
import TrashIcon from '~/assets/images/utils/trash.svg?inline'
import EditIcon from '~/assets/images/utils/edit.svg?inline'
import ClientIcon from '~/assets/images/utils/client.svg?inline'
import ServerIcon from '~/assets/images/utils/server.svg?inline'
import FileTextIcon from '~/assets/images/utils/file-text.svg?inline'
import StorageCategory from '~/assets/images/categories/storage.svg?inline'
import DownloadIcon from '~/assets/images/utils/download.svg?inline'
// import CalendarIcon from '~/assets/images/utils/calendar.svg?inline'
import TagIcon from '~/assets/images/utils/tag.svg?inline'
import ReportIcon from '~/assets/images/utils/report.svg?inline'

export default {
  components: {
    FileInput,
    Categories,
    DownloadIcon,
    ClientIcon,
    ServerIcon,
    FileTextIcon,
    StorageCategory,
    // CalendarIcon,
    TagIcon,
    TrashIcon,
    EditIcon,
    ReportIcon,
    ConfirmPopup,
  },
  auth: false,
  props: {
    modpackage: {
      type: Object,
      default() {
        return {}
      },
    },
    versions: {
      type: Array,
      default() {
        return []
      },
    },
    members: {
      type: Array,
      default() {
        return [{}]
      },
    },
    currentMember: {
      type: Object,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      filesToUpload: [],
      popup_data: null,
    }
  },
  computed: {
    version() {
      return this.versions.find((x) => x.version === this.$route.params.version)
    },
  },
  mounted() {
    this.$emit('update:link-bar', [
      ['Versions', 'versions'],
      [this.version.version, 'version/' + this.version.version],
    ])
  },
  methods: {
    deleteFilePopup(hash) {
      this.popup_data = hash
      this.$refs.delete_file_popup.show()
    },
    async deleteFile(hash) {
      this.$nuxt.$loading.start()

      await this.$axios.delete(`version_file/${hash}`, this.$auth.headers)

      await this.$router.go(null)
      this.$nuxt.$loading.finish()
    },
    async addFiles(files) {
      this.filesToUpload = files

      for (let i = 0; i < files.length; i++) {
        this.filesToUpload[i].multipartName = files[i].name.concat('-' + i)
      }

      this.$nuxt.$loading.start()

      const formData = new FormData()

      formData.append('data', JSON.stringify({}))

      for (const fileToUpload of this.filesToUpload) {
        formData.append(
          fileToUpload.multipartName,
          new Blob([fileToUpload]),
          fileToUpload.name
        )
      }

      try {
        await this.$axios({
          url: `version/${this.version.version}/file`,
          method: 'POST',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: this.$auth.token,
          },
        })

        await this.$router.go(null)
      } catch (err) {
        this.$notify({
          group: 'main',
          title: 'An error occurred',
          text: err.response.data.description,
          type: 'error',
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }

      this.$nuxt.$loading.finish()
    },
    deleteVersionPopup() {
      this.$refs.delete_version_popup.show()
    },
    async deleteVersion() {
      this.$nuxt.$loading.start()

      await this.$axios.delete(
        `version/${this.version.version}`,
        this.$auth.headers
      )

      await this.$router.replace(`/package/${this.modpackage.packageId}`)
      this.$nuxt.$loading.finish()
    },
  },
}
</script>

<style lang="scss" scoped>
.version {
  margin-bottom: var(--spacing-card-md);
  background: var(--color-raised-bg);
  border-radius: var(--size-rounded-card);
  padding: 1rem;

  .version-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    h4,
    span {
      margin: auto 0.5rem auto 0;
    }

    .buttons {
      display: flex;
      align-self: flex-end;

      @media screen and (min-width: 1024px) {
        margin-left: auto;
      }

      .action:not(:first-child) {
        margin: 0 0 0 0.5rem;
      }
    }
    .download {
      background-color: var(--color-brand);
      color: white;
      &:hover {
        background-color: var(--color-brand-hover);
      }
    }
  }

  .markdown-body {
    margin: 1rem 0;
  }

  .files {
    margin-top: 1.3rem;
    display: flex;

    .file {
      display: flex;
      margin-right: 0.5rem;
      border-radius: var(--size-rounded-control);
      border: 1px solid var(--color-divider);

      .text-wrapper {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;

        .actions {
          width: 100%;
          display: flex;
          justify-content: space-between;
          max-height: 3rem;
          font-size: var(--font-size-sm);

          button {
            display: flex;
            align-items: center;

            svg {
              margin-left: 0.25rem;
            }
          }
        }
      }

      a {
        display: flex;
        align-items: center;
        margin-left: auto;
        width: 2.5rem;
        height: auto;
        background-color: var(--color-button-bg);
        color: var(--color-button-text);
        border-radius: 0 var(--size-rounded-control) var(--size-rounded-control)
          0;

        svg {
          vertical-align: center;
          height: 30px;
          width: 40px;
        }

        &:hover,
        &:focus {
          background-color: var(--color-button-bg-hover);
          color: var(--color-button-text-hover);
        }
      }
    }
  }
}

.stats {
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0;

  .stat {
    padding: 0.4rem 0.4rem 0.4rem 0rem;
    box-sizing: border-box;
    @extend %stat;

    svg {
      padding: 0.25rem;
      border-radius: 50%;
      background-color: var(--color-button-bg);
    }
  }
}

.file-input {
  margin-top: 1rem;
}
</style>
