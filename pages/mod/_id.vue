<template>
  <div class="page-container">
    <div class="page-contents">
      <div class="content">
        <div class="header">
          <div class="icon">
            <nuxt-link :to="'/mod/' + mod.packageId">
              <img
                :src="
                  mod.iconUrls[0]
                    ? mod.iconUrls[0]
                    : 'https://cdn.modrinth.com/placeholder.svg?inline'
                "
                alt="Icon"
            /></nuxt-link>
          </div>
          <div class="info">
            <nuxt-link :to="'/mod/' + mod.packageId">
              <h1 class="title">{{ mod.name }}</h1>
            </nuxt-link>
            <p class="description">
              {{ mod.description }}
            </p>
            <div class="alt-nav">
              <p>
                <nuxt-link to="/mods"> Mods </nuxt-link>
                >
                <nuxt-link :to="'/mod/' + mod.packageId">
                  {{ mod.name }}
                </nuxt-link>
                <span v-if="linkBar.length > 0"> > </span>
                <nuxt-link
                  v-for="(link, index) in linkBar"
                  :key="index"
                  :to="/mod/ + mod.packageId + '/' + link[1]"
                  >{{ link[0] }}
                  <span v-if="index !== linkBar.length - 1"> > </span>
                </nuxt-link>
              </p>
            </div>
          </div>
          <div class="buttons">
            <nuxt-link
              v-if="this.$auth.user"
              :to="`/report/create?id=${mod.packageId}&t=mod`"
              class="iconified-button"
            >
              <ReportIcon />
              Report
            </nuxt-link>
            <button
              v-if="userFollows && !userFollows.includes(mod.packageId)"
              class="iconified-button"
              @click="followMod"
            >
              <FollowIcon />
              Follow
            </button>
            <button
              v-if="userFollows && userFollows.includes(mod.packageId)"
              class="iconified-button"
              @click="unfollowMod"
            >
              <FollowIcon fill="currentColor" />
              Unfollow
            </button>
          </div>
        </div>
        <div class="mod-navigation">
          <div class="tabs">
            <nuxt-link :to="'/mod/' + mod.packageId" class="tab">
              <span>Description</span>
            </nuxt-link>
            <nuxt-link :to="'/mod/' + mod.packageId + '/versions'" class="tab">
              <span>Versions</span>
            </nuxt-link>
            <a v-if="mod.wiki" :href="mod.wiki" target="_blank" class="tab">
              <ExternalIcon />
              <span>Wiki</span>
            </a>
            <a v-if="mod.issues" :href="mod.issues" target="_blank" class="tab">
              <ExternalIcon />
              <span>Issues</span>
            </a>
            <a v-if="mod.source" :href="mod.source" target="_blank" class="tab">
              <ExternalIcon />
              <span>Source</span>
            </a>
            <a
              v-if="mod.chats.discord"
              :href="mod.chats.discord"
              target="_blank"
              class="tab"
            >
              <ExternalIcon />
              <span>Discord</span>
            </a>
            <nuxt-link
              v-if="currentMember"
              :to="'/mod/' + mod.packageId + '/settings'"
              class="tab settings-tab"
            >
              <SettingsIcon />
              <span>Settings</span>
            </nuxt-link>
          </div>
        </div>
        <div class="mod-content">
          <NuxtChild
            :mod="mod"
            :versions="versions"
            :featured-versions="featuredVersions"
            :members="members"
            :current-member="currentMember"
            :all-members="allMembers"
            :link-bar.sync="linkBar"
          />
        </div>
      </div>
      <section class="mod-info">
        <div class="mod-stats section">
          <!-- <div class="stat">
            <DownloadIcon />
            <div class="info">
              <h4>Downloads</h4>
              <p class="value">{{ formatNumber(mod.downloads) }}</p>
            </div>
          </div>
          <div class="stat">
            <CalendarIcon />
            <div class="info">
              <h4>Created</h4>
              <p
                v-tooltip="
                  $dayjs(mod.published).format(
                    '[Created on] YYYY-MM-DD [at] HH:mm A'
                  )
                "
                class="value"
              >
                {{ formatTime(mod.published) }}
              </p>
            </div>
          </div>
          <div class="stat">
            <TagIcon />
            <div class="info">
              <h4>Available For</h4>
              <p class="value">
                {{
                  versions[0]
                    ? versions[0].game_versions[0]
                      ? versions[0].game_versions[
                          versions[0].game_versions.length - 1
                        ]
                      : 'None'
                    : 'None'
                }}
              </p>
            </div>
          </div> -->
          <!-- <div class="stat">
            <EditIcon /> -->
          <!-- <div class="info">
              <h4>Updated</h4>
              <p
                v-tooltip="
                  $dayjs(mod.updated).format(
                    '[Updated on] YYYY-MM-DD [at] HH:mm A'
                  )
                "
                class="value"
              >
                {{ formatTime(mod.updated) }}
              </p>
            </div>
          </div>
          <div class="stat">
            <ClientIcon />
            <div class="info">
              <h4>Client Side</h4>
              <p class="value capitalize">{{ mod.client_side }}</p>
            </div>
          </div>
          <div class="stat">
            <ServerIcon />
            <div class="info">
              <h4>Server Side</h4>
              <p class="value capitalize">{{ mod.server_side }}</p>
            </div>
          </div> -->
          <!-- <div class="stat">
            <FileTextIcon />
            <div class="info">
              <h4>License</h4>
              <p v-tooltip="mod.license" class="value ellipsis">
                <a :href="mod.license.url || null">
                  {{ mod.license.id.toUpperCase() }}</a
                >
              </p>
            </div>
          </div> -->
          <div class="stat">
            <CodeIcon />
            <div class="info">
              <h4>Package ID</h4>
              <p class="value">{{ mod.packageId }}</p>
            </div>
          </div>
          <!-- <Categories :categories="mod.categories.concat(mod.loaders)" /> -->
        </div>
        <!-- <div class="section">
          <h3>Members</h3>
          <div
            v-for="member in members"
            :key="member.user_id"
            class="team-member columns"
          >
            <img :src="member.avatar_url" alt="profile-picture" />
            <div class="member-info">
              <nuxt-link :to="'/user/' + member.user_id">
                <h4>{{ member.name }}</h4>
              </nuxt-link>
              <h3>{{ member.role }}</h3>
            </div>
          </div>
        </div> -->
        <!-- <div v-if="featuredVersions.length > 0" class="section">
          <h3>Featured Versions</h3>
          <div
            v-for="version in featuredVersions"
            :key="version.id"
            class="featured-version"
          >
            <a
              :href="findPrimary(version).url"
              class="download"
              @click.prevent="
                downloadFile(
                  findPrimary(version).hashes.sha1,
                  findPrimary(version).url
                )
              "
            >
              <DownloadIcon />
            </a>
            <div class="info">
              <div class="top">
                <span
                  v-if="version.version_type === 'release'"
                  class="badge green"
                >
                  Release
                </span>
                <span
                  v-if="version.version_type === 'beta'"
                  class="badge yellow"
                >
                  Beta
                </span>
                <span v-if="version.version_type === 'alpha'" class="badge red">
                  Alpha
                </span>
                <h4 class="title">
                  <nuxt-link
                    :to="'/mod/' + mod.packageId + '/version/' + version.id"
                  >
                    {{ version.name }}
                  </nuxt-link>
                </h4>
              </div>
              <div class="bottom">
                <span class="version-number limit-text-width">
                  {{ version.version_number }} ·
                </span>
                <FabricIcon
                  v-if="version.loaders.includes('fabric')"
                  class="loader"
                />
                <ForgeIcon
                  v-if="version.loaders.includes('forge')"
                  class="loader"
                />
                <span
                  v-if="version.game_versions.length > 0"
                  class="game-version limit-text-width"
                >
                  ·
                  {{ version.game_versions[version.game_versions.length - 1] }}
                </span>
              </div>
            </div>
          </div>
        </div> -->
        <!-- <div
          v-if="mod.donation_urls && mod.donation_urls.length > 0"
          class="section"
        >
          <h3>Donation Links</h3>
          <div
            v-for="(item, index) in mod.donation_urls"
            :key="index"
            class="links"
          >
            <a :href="item.url" class="link">
              <ExternalIcon />
              {{ item.platform }}
            </a>
          </div>
        </div> -->
        <m-footer class="footer" />
      </section>
    </div>
  </div>
</template>

<script>
// import Categories from '~/components/ui/search/Categories'
import MFooter from '~/components/layout/MFooter'

// import CalendarIcon from '~/assets/images/utils/calendar.svg?inline'
// import DownloadIcon from '~/assets/images/utils/download.svg?inline'
// import EditIcon from '~/assets/images/utils/edit.svg?inline'
// import TagIcon from '~/assets/images/utils/tag.svg?inline'
// import ClientIcon from '~/assets/images/utils/client.svg?inline'
// import ServerIcon from '~/assets/images/utils/server.svg?inline'
// import FileTextIcon from '~/assets/images/utils/file-text.svg?inline'
import CodeIcon from '~/assets/images/sidebar/mod.svg?inline'
import ReportIcon from '~/assets/images/utils/report.svg?inline'
import FollowIcon from '~/assets/images/utils/heart.svg?inline'

import ExternalIcon from '~/assets/images/utils/external.svg?inline'
import SettingsIcon from '~/assets/images/utils/settings.svg?inline'

// import ForgeIcon from '~/assets/images/categories/forge.svg?inline'
// import FabricIcon from '~/assets/images/categories/fabric.svg?inline'

export default {
  name: 'ModPage',
  components: {
    MFooter,
    // Categories,
    ExternalIcon,
    SettingsIcon,
    // ForgeIcon,
    // FabricIcon,
    // DownloadIcon,
    // CalendarIcon,
    // EditIcon,
    // TagIcon,
    // ClientIcon,
    // ServerIcon,
    // FileTextIcon,
    CodeIcon,
    ReportIcon,
    FollowIcon,
  },
  async asyncData(data) {
    try {
      const mod = (
        await data.$axios.get(`mod/${data.params.id}`, data.$auth.headers)
      ).data

      mod.packageId = 'CaffeineMC.sodium'

      // const [members, versions, featuredVersions, userFollows] = (
      //   await Promise.all([
      //     data.$axios.get(`team/${mod.team}/members`, data.$auth.headers),
      //     data.$axios.get(`mod/${mod.packageId}/version`),
      //     data.$axios.get(`mod/${mod.packageId}/version?featured=true`),
      //     data.$axios.get(
      //       data.$auth.user
      //         ? `user/${data.$auth.user.id}/follows`
      //         : `https://api.modrinth.com`,
      //       data.$auth.headers
      //     ),
      //   ])
      // ).map((it) => it.data)

      // const users = (
      //   await data.$axios.get(
      //     `users?ids=${JSON.stringify(members.map((it) => it.user_id))}`,
      //     data.$auth.headers
      //   )
      // ).data

      // users.forEach((it) => {
      //   const index = members.findIndex((x) => x.user_id === it.id)
      //   members[index].avatar_url = it.avatar_url
      //   members[index].name = it.username
      // })

      // const currentMember = data.$auth.user
      //   ? members.find((x) => x.user_id === data.$auth.user.id)
      //   : null

      // if (mod.body_url && !mod.body) {
      //   mod.body = (await data.$axios.get(mod.body_url)).data
      // }
      mod.body = mod.description

      return {
        mod,
        // versions,
        // featuredVersions,
        // members: members.filter((x) => x.accepted),
        // allMembers: members,
        // currentMember,
        // userFollows: userFollows.name ? null : userFollows,
        linkBar: [],
      }
    } catch {
      data.error({
        statusCode: 404,
        message: 'Mod not found',
      })
    }
  },
  methods: {
    formatNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    findPrimary(version) {
      let file = version.files.find((x) => x.primary)

      if (!file) {
        file = version.files[0]
      }

      if (!file) {
        file = { url: `/mod/${this.mod.packageId}/version/${version.id}` }
      }

      return file
    },
    async downloadFile(hash, url) {
      await this.$axios.get(`version_file/${hash}/download`)

      const elem = document.createElement('a')
      elem.download = hash
      elem.href = url
      elem.click()
    },
    async followMod() {
      await this.$axios.post(
        `mod/${this.mod.packageId}/follow`,
        {},
        this.$auth.headers
      )

      this.userFollows.push(this.mod.packageId)
    },
    async unfollowMod() {
      await this.$axios.delete(
        `mod/${this.mod.packageId}/follow`,
        this.$auth.headers
      )

      this.userFollows.splice(this.userFollows.indexOf(this.mod.packageId), 1)
    },
    formatTime(date) {
      let defaultMessage = this.$dayjs(date).fromNow()
      if (defaultMessage.length > 13) {
        defaultMessage = defaultMessage.replace('minutes', 'min.')
      }
      return defaultMessage
    },
  },
  head() {
    return {
      title: this.mod.name + ' - Modrinth',
      meta: [
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.mod.name,
        },
        {
          hid: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          content: this.mod.name,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.mod.description,
        },
        {
          hid: 'description',
          name: 'description',
          content: `${this.mod.name}: ${this.mod.description} View other minecraft mods on Modrinth today! Modrinth is a new and modern Minecraft modding platform supporting both the Forge and Fabric mod loaders.`,
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: `https://modrinth.com/mod/${this.mod.packageId}`,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.mod.iconUrls[0]
            ? this.mod.iconUrls[0]
            : 'https://cdn.modrinth.com/placeholder.png',
        },
        {
          hid: 'robots',
          name: 'robots',
          content: this.mod.status !== 'approved' ? 'noindex' : 'all',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;

  @extend %card-spaced-b;
  .icon {
    margin: unset 0;
    height: 6.08rem;
    @media screen and (min-width: 1024px) {
      align-self: flex-start;
    }
    img {
      height: 100%;
      width: auto;
      margin: 0;
      border-radius: var(--size-rounded-icon);
    }
  }
  .info {
    @extend %column;
    display: flex;
    justify-content: flex-start;
    height: calc(100% - 0.2rem);
    p {
      margin: 0;
    }
    .title {
      margin: 0;
      color: var(--color-text-dark);
      font-size: var(--font-size-lg);
    }
    .description {
      margin-top: var(--spacing-card-sm);
      margin-bottom: 0.5rem;
      color: var(--color-text-dark);
    }
    .alt-nav {
      margin-top: auto;
      p {
        margin: 0;
      }
    }
  }
  .buttons {
    @extend %row;

    button,
    a {
      margin: 0;
      padding: 0.2rem 0.5rem;
      display: flex;

      &:not(:last-child) {
        margin-right: 0.5rem;
        @media screen and (min-width: 1024px) {
          margin-right: 0;
          margin-bottom: 0.5rem;
        }
      }
    }
  }

  > div {
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }

  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: auto 1fr auto;
    padding: 1rem;
    grid-gap: 1rem;
    text-align: left;

    .buttons {
      align-self: flex-start;
      flex-direction: column;
    }

    > div {
      margin-bottom: 0;
    }
  }
}

.mod-navigation {
  @extend %card-spaced-b;
  padding: 0 1rem;

  .tabs {
    overflow-x: auto;
    padding: 0;

    .tab {
      padding: 0;
      margin: 0.9rem 0.5rem 0.8rem 0.5rem;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .settings-tab {
    @media screen and (min-width: 1024px) {
      margin-left: auto !important;
    }
  }
}

.mod-info {
  height: auto;

  @media screen and (min-width: 1024px) {
    width: 30rem;
    margin-left: var(--spacing-card-lg);
  }

  .section {
    padding: var(--spacing-card-sm);
    @extend %card-spaced-b;
  }

  h3 {
    @extend %large-label;
  }

  .mod-stats {
    // display: flex;
    // flex-wrap: wrap;
    margin-top: 0;
    p {
      // max-width: 6rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: '';
      margin: 3px;
    }
    .stat {
      // width: 8.5rem;
      margin: 0.75rem;
      @extend %stat;

      svg {
        padding: 0.25rem;
      }
    }
  }

  .team-member {
    margin-left: 5px;
    margin-bottom: 10px;

    img {
      border-radius: var(--size-rounded-icon);
      height: 50px;
      width: 50px;
    }
    .member-info {
      max-width: 150px;
      overflow: hidden;
      margin: auto 0 auto 0.5rem;
      h4 {
        font-weight: normal;
        margin: 0;
      }
      h3 {
        margin-top: 0.1rem;
        margin-bottom: 0;
      }
    }
  }

  .featured-version {
    @extend %row;
    padding-top: var(--spacing-card-sm);
    padding-bottom: var(--spacing-card-sm);
    .download {
      display: flex;
      align-items: center;
      height: 2.25rem;
      width: 2.25rem;
      border-radius: 2rem;
      background-color: var(--color-button-bg);
      margin-right: var(--spacing-card-sm);
      &:hover {
        background-color: var(--color-button-bg-hover);
      }
      svg {
        width: 1.25rem;
        margin: auto;
      }
      flex-shrink: 0;
    }
    .info {
      @extend %column;
      font-size: var(--font-size-xs);
      .top {
        @extend %row;
        .badge {
          font-size: var(--font-size-xs);
          margin-right: var(--spacing-card-sm);
        }
        .title {
          margin: auto 0;
        }
      }
      .bottom {
        margin-top: 0.25rem;
        @extend %row;
        .loader {
          height: 1rem;
        }
      }
    }
  }

  .links {
    padding: 0.5rem 1rem;

    .link {
      display: flex;
      align-items: center;
      padding: 0.25rem 0;

      svg {
        width: 1rem;
        height: 1rem;
        margin-right: 0.3rem;
      }

      &:hover,
      &:focus {
        padding-bottom: calc(0.25rem - 3px);
        border-bottom: 3px solid var(--color-brand-disabled);
        color: var(--color-text-medium);
      }
    }
  }
}

.limit-text-width {
  display: inline-block;
  height: 1em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media screen and (max-width: 550px) {
  .title a {
    display: none;
  }
}

@media screen and (max-width: 800px) {
  .mod-navigation {
    display: block;
    overflow-x: auto;
    overflow-wrap: break-word;
    overflow-y: hidden;
  }
}
/*
@media screen and (max-width: 1400px) {
  .mod-info {
    display: none;
  }
}
*/
</style>
