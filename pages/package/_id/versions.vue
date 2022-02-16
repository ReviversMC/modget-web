<template>
  <div>
    <table>
      <thead>
        <tr>
          <!-- <th></th> -->
          <th><span>Version</span></th>
          <th><span>Mod Loader</span></th>
          <th><span>Minecraft Versions</span></th>
          <th><span>Channel</span></th>
          <th><span>Hoster</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="version in versions" :key="version.version">
          <!-- <td>
            <a :href="version.downloadPageUrls.modrinth" class="download">
              <DownloadIcon />
            </a>
          </td> -->
          <td>
            <nuxt-link
              :to="
                '/package/' +
                modpackage.packageId +
                '/version/' +
                version.version
              "
            >
              {{ version.version }}
            </nuxt-link>
          </td>
          <td>
            <FabricIcon v-if="version.loaders.includes('FABRIC')" />
            <ForgeIcon v-if="version.loaders.includes('FORGE')" />
          </td>
          <td>{{ version.minecraftVersions.join(', ') }}</td>
          <td>
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
          </td>
          <td>
            <span v-if="version.downloadPageUrls.modrinth">Modrinth</span
            ><span v-if="version.downloadPageUrls.curseforge"
              ><span v-if="version.downloadPageUrls.modrinth">,<br /></span>
              CurseForge</span
            ><span v-if="version.downloadPageUrls.sourceControl"
              ><span
                v-if="
                  version.downloadPageUrls.modrinth ||
                  version.downloadPageUrls.curseforge
                "
                >,<br />
              </span>
              Source Control</span
            >
            <span
              v-for="(downloadPage, index) in version.downloadPageUrls.other"
              :key="downloadPage.url"
            >
              {{ downloadPage.name
              }}<span v-if="index !== version.downloadPageUrls.other.length - 1"
                >,</span
              >
            </span>
          </td>
          <!-- <td>
            {{ $dayjs(version.date_published).format('YYYY-MM-DD') }}
          </td> -->
        </tr>
      </tbody>
    </table>
    <div class="new-version">
      <nuxt-link v-if="currentMember" to="newversion" class="button">
        New Version
      </nuxt-link>
    </div>
  </div>
</template>
<script>
// import DownloadIcon from '~/assets/images/utils/download.svg?inline'
import ForgeIcon from '~/assets/images/categories/forge.svg?inline'
import FabricIcon from '~/assets/images/categories/fabric.svg?inline'

export default {
  components: {
    ForgeIcon,
    FabricIcon,
    // DownloadIcon,
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
    currentMember: {
      type: Object,
      default() {
        return null
      },
    },
  },
  created() {
    this.$emit('update:link-bar', [['Versions', 'versions']])
  },
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  margin-bottom: var(--spacing-card-md);
  background: var(--color-raised-bg);
  border-radius: var(--size-rounded-card);
  table-layout: fixed;
  width: 100%;

  * {
    text-align: left;
  }

  tr:not(:last-child),
  tr:first-child {
    th,
    td {
      border-bottom: 1px solid var(--color-divider);
    }
  }

  th,
  td {
    > a {
      display: inline-block;
      width: 100%;
      padding: 15px 0px;
    }
    // &:first-child {
    //   text-align: center;
    //   width: 7%;
    //   .download {
    //     display: flex;
    //     align-items: center;
    //     height: 2.25rem;
    //     width: 2.25rem;
    //     border-radius: 2rem;
    //     margin: auto;
    //     background-color: var(--color-button-bg);
    //     &:hover {
    //       background-color: var(--color-button-bg-hover);
    //     }
    //     svg {
    //       width: 1.25rem;
    //       margin: auto;
    //     }
    //   }
    // }

    &:first-child > * {
      margin-left: 5%;
    }
    &:nth-child(2),
    &:nth-child(4) {
      padding-left: 0;
      width: 12%;
    }
  }

  th {
    color: var(--color-heading);
    font-size: 0.8rem;
    letter-spacing: 0.02rem;
    margin-bottom: 0.5rem;
    margin-top: 1.5rem;
    padding: 0.75rem 1rem;
    text-transform: uppercase;
  }

  td {
    overflow: hidden;
    padding: 0.75rem 1rem;

    img {
      height: 3rem;
      width: 3rem;
    }
  }
}

.new-version {
  width: 100%;
  text-align: right;
  margin-bottom: var(--spacing-card-md);
}

// @media screen and (max-width: 400px) {
//   th,
//   td {
//     &:nth-child(7) {
//       display: none;
//     }
//   }
// }

// @media screen and (max-width: 600px) {
//   th,
//   td {
//     &:nth-child(8) {
//       display: none;
//     }
//   }
// }

@media screen and (max-width: 620px) {
  th,
  td {
    &:first-child {
      > * {
        margin-left: 0 !important;
      }
    }
    &:nth-child(5) {
      display: none;
    }
  }
}

@media screen and (max-width: 515px) {
  th,
  td {
    &:first-child {
      width: 20%;
    }
    &:nth-child(3) {
      width: 15%;
    }
  }
}

@media screen and (max-width: 470px) {
  th,
  td {
    &:first-child {
      width: 10%;
    }
    &:nth-child(2) {
      width: 6% !important;
    }
  }
}
</style>
