<template>
  <div class="page-container">
    <div class="page-contents">
      <div class="content">
        <div class="header">
          <div class="icon">
            <nuxt-link :to="'/package/' + modpackage.packageId">
              <img
                :src="
                  modpackage.iconUrls[0]
                    ? modpackage.iconUrls[0]
                    : 'https://cdn.modrinth.com/placeholder.svg?inline'
                "
                alt="Icon"
            /></nuxt-link>
          </div>
          <div class="info">
            <nuxt-link :to="'/package/' + modpackage.packageId">
              <h1 class="title">{{ modpackage.name }}</h1>
            </nuxt-link>
            <p class="description">
              {{ modpackage.description }}
            </p>
            <div class="alt-nav">
              <p>
                <nuxt-link to="/mods"> Mods </nuxt-link>
                >
                <nuxt-link :to="'/package/' + modpackage.packageId">
                  {{ modpackage.name }}
                </nuxt-link>
                <span v-if="linkBar.length > 0"> > </span>
                <nuxt-link
                  v-for="(link, index) in linkBar"
                  :key="index"
                  :to="/package/ + modpackage.packageId + '/' + link[1]"
                  >{{ link[0] }}
                  <span v-if="index !== linkBar.length - 1"> > </span>
                </nuxt-link>
              </p>
            </div>
          </div>
          <div class="buttons">
            <nuxt-link
              v-if="this.$auth.user"
              :to="`/report/create?id=${modpackage.packageId}&t=modpackage`"
              class="iconified-button"
            >
              <ReportIcon />
              Report
            </nuxt-link>
            <button
              v-if="userFollows && !userFollows.includes(modpackage.packageId)"
              class="iconified-button"
              @click="followpackage"
            >
              <FollowIcon />
              Follow
            </button>
            <button
              v-if="userFollows && userFollows.includes(modpackage.packageId)"
              class="iconified-button"
              @click="unfollowPackage"
            >
              <FollowIcon fill="currentColor" />
              Unfollow
            </button>
          </div>
        </div>
        <div class="modpackage-navigation">
          <div class="tabs">
            <nuxt-link :to="'/package/' + modpackage.packageId" class="tab">
              <span>Description</span>
            </nuxt-link>
            <nuxt-link
              :to="'/package/' + modpackage.packageId + '/versions'"
              class="tab"
            >
              <span>Versions</span>
            </nuxt-link>
            <a
              v-if="modpackage.wiki"
              :href="modpackage.wiki"
              target="_blank"
              class="tab"
            >
              <ExternalIcon />
              <span>Wiki</span>
            </a>
            <a
              v-if="modpackage.issues"
              :href="modpackage.issues"
              target="_blank"
              class="tab"
            >
              <ExternalIcon />
              <span>Issues</span>
            </a>
            <a
              v-if="modpackage.source"
              :href="modpackage.source"
              target="_blank"
              class="tab"
            >
              <ExternalIcon />
              <span>Source</span>
            </a>
            <a
              v-if="modpackage.chats.discord"
              :href="modpackage.chats.discord"
              target="_blank"
              class="tab"
            >
              <ExternalIcon />
              <span>Discord</span>
            </a>
            <nuxt-link
              v-if="currentMember"
              :to="'/package/' + modpackage.packageId + '/settings'"
              class="tab settings-tab"
            >
              <SettingsIcon />
              <span>Settings</span>
            </nuxt-link>
          </div>
        </div>
        <div class="modpackage-content">
          <NuxtChild
            :modpackage="modpackage"
            :versions="versions"
            :featured-versions="modpackage.featuredVersions"
            :members="members"
            :current-member="currentMember"
            :all-members="allMembers"
            :link-bar.sync="linkBar"
          />
        </div>
      </div>
      <section class="modpackage-info">
        <div class="modpackage-stats section">
          <div class="modpackage-stats__info">
            <!-- <div class="stat">
              <DownloadIcon />
              <div class="info">
                <h4>Downloads</h4>
                <p class="value">{{ formatNumber(modpackage.downloads) }}</p>
              </div>
            </div>
            <div class="stat">
              <CalendarIcon />
              <div class="info">
                <h4>Created</h4>
                <p
                  v-tooltip="
                    $dayjs(modpackage.published).format(
                      '[Created on] YYYY-MM-DD [at] HH:mm A'
                    )
                  "
                  class="value"
                >
                  {{ formatTime(modpackage.published) }}
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
                    $dayjs(modpackage.updated).format(
                      '[Updated on] YYYY-MM-DD [at] HH:mm A'
                    )
                  "
                  class="value"
                >
                  {{ formatTime(modpackage.updated) }}
                </p>
              </div>
            </div>
            <div class="stat">
              <ClientIcon />
              <div class="info">
                <h4>Client Side</h4>
                <p class="value capitalize">{{ modpackage.client_side }}</p>
              </div>
            </div>
            <div class="stat">
              <ServerIcon />
              <div class="info">
                <h4>Server Side</h4>
                <p class="value capitalize">{{ modpackage.server_side }}</p>
              </div>
            </div> -->
            <!-- <div class="stat">
              <FileTextIcon />
              <div class="info">
                <h4>License</h4>
                <p v-tooltip="modpackage.license" class="value ellipsis">
                  <a :href="modpackage.license.url || null">
                    {{ modpackage.license.id.toUpperCase() }}</a
                  >
                </p>
              </div>
            </div> -->
            <div class="stat">
              <TagIcon />
              <div class="info">
                <h4>Status</h4>
                <p v-tooltip="modpackage.status" class="value ellipsis">
                  {{ modpackage.status.toLowerCase() }}
                </p>
              </div>
            </div>
            <div class="stat">
              <FabricIcon />
              <div class="info">
                <h4>Loader</h4>
                <span
                  v-for="loader in modpackage.loaders"
                  :key="loader"
                  v-tooltip="modpackage.loaders"
                  class="value ellipsis"
                >
                  <span
                    v-if="loader != modpackage.loaders[0]"
                    style="display: inline"
                    >&
                  </span>
                  {{ loader.toLowerCase() }}
                </span>
              </div>
            </div>
            <div class="stat">
              <FileTextIcon />
              <div class="info">
                <h4>Alternative Names</h4>
                <span
                  v-for="name in modpackage.alternativeNames"
                  :key="name"
                  v-tooltip="modpackage.alternativeNames"
                  class="value ellipsis"
                >
                  <span
                    v-if="name != modpackage.alternativeNames[0]"
                    style="display: inline"
                    >&
                  </span>
                  {{ name.toLowerCase() }}
                </span>
              </div>
            </div>

            <div class="stat">
              <CodeIcon />
              <div class="info">
                <h4>Package ID</h4>
                <p class="value">{{ modpackage.packageId }}</p>
              </div>
            </div>
          </div>

          <div class="modpackage-stats__categories">
            <Categories :categories="modpackage.tags" />
          </div>
        </div>
        <div class="section">
          <h3>Authors</h3>
          <div
            v-for="author in modpackage.authors"
            :key="author"
            class="team-member columns"
          >
            <img
              src="https://cdn.modrinth.com/placeholder.svg?inline"
              alt="profile-picture"
            />
            <div class="member-info">
              <nuxt-link :to="'/user/' + author.name">
                <h3>{{ author.name }}</h3>
              </nuxt-link>
              <h4>Member</h4>
            </div>
          </div>
        </div>

        <div v-if="modpackage.featuredVersions.length > 0" class="section">
          <h3>Featured Versions</h3>
          <div
            v-for="version in modpackage.featuredVersions"
            :key="version.version"
            class="featured-version"
          >
            <a :href="version.downloadPageUrls.modrinth" class="download">
              <DownloadIcon />
            </a>
            <div class="info">
              <div class="top">
                <span
                  v-if="version.channel.toLowerCase() === 'release'"
                  class="badge green"
                >
                  Release
                </span>
                <span
                  v-else-if="version.channel.toLowerCase() === 'beta'"
                  class="badge yellow"
                >
                  Beta
                </span>
                <span
                  v-else-if="version.channel.toLowerCase() === 'alpha'"
                  class="badge red"
                >
                  Alpha
                </span>
                <h4 class="title">
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
                </h4>
              </div>
              <div class="bottom">
                <span class="version-number limit-text-width">
                  {{ version.version }} ·
                </span>
                <FabricIcon
                  v-if="version.loaders.includes('FABRIC')"
                  class="loader"
                />
                <ForgeIcon
                  v-if="version.loaders.includes('FORGE')"
                  class="loader"
                />
                <span
                  v-if="version.minecraftVersions.length > 0"
                  class="game-version limit-text-width"
                >
                  ·
                  {{ version.minecraftVersions[0] }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div
          v-if="modpackage.donation_urls && modpackage.donation_urls.length > 0"
          class="section"
        >
          <h3>Donation Links</h3>
          <div
            v-for="(item, index) in modpackage.donation_urls"
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
import Categories from '~/components/ui/search/Categories'
import MFooter from '~/components/layout/MFooter'

// import CalendarIcon from '~/assets/images/utils/calendar.svg?inline'
import DownloadIcon from '~/assets/images/utils/download.svg?inline'
// import EditIcon from '~/assets/images/utils/edit.svg?inline'
import TagIcon from '~/assets/images/utils/tag.svg?inline'
// import ClientIcon from '~/assets/images/utils/client.svg?inline'
// import ServerIcon from '~/assets/images/utils/server.svg?inline'
import FileTextIcon from '~/assets/images/utils/file-text.svg?inline'
import CodeIcon from '~/assets/images/sidebar/mod.svg?inline'
import ReportIcon from '~/assets/images/utils/report.svg?inline'
import FollowIcon from '~/assets/images/utils/heart.svg?inline'

import ExternalIcon from '~/assets/images/utils/external.svg?inline'
import SettingsIcon from '~/assets/images/utils/settings.svg?inline'

import ForgeIcon from '~/assets/images/categories/forge.svg?inline'
import FabricIcon from '~/assets/images/categories/fabric.svg?inline'

export default {
  name: 'PackagePage',
  components: {
    MFooter,
    Categories,
    ExternalIcon,
    SettingsIcon,
    ForgeIcon,
    FabricIcon,
    DownloadIcon,
    // CalendarIcon,
    // EditIcon,
    TagIcon,
    // ClientIcon,
    // ServerIcon,
    FileTextIcon,
    CodeIcon,
    ReportIcon,
    FollowIcon,
  },
  async asyncData(data) {
    try {
      const modpackage = (
        await data.$axios.get(`package/${data.params.id}`, data.$auth.headers)
      ).data

      // const [members, versions, featuredVersions, userFollows] = (
      //   await Promise.all([
      //     data.$axios.get(`team/${modpackage.team}/members`, data.$auth.headers),
      //     data.$axios.get(`modpackage/${modpackage.packageId}/version`),
      //     data.$axios.get(`modpackage/${modpackage.packageId}/version?featured=true`),
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

      // if (modpackage.body_url && !modpackage.body) {
      //   modpackage.body = (await data.$axios.get(modpackage.body_url)).data
      // }
      modpackage.body = modpackage.description

      return {
        modpackage,
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
        message: 'Package not found',
      })
    }
  },
  methods: {
    formatNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    async downloadFile(hash, url) {
      await this.$axios.get(`version_file/${hash}/download`)

      const elem = document.createElement('a')
      elem.download = hash
      elem.href = url
      elem.click()
    },
    async followPackage() {
      await this.$axios.post(
        `package/${this.modpackage.packageId}/follow`,
        {},
        this.$auth.headers
      )

      this.userFollows.push(this.modpackage.packageId)
    },
    async unfollowPackage() {
      await this.$axios.delete(
        `package/${this.modpackage.packageId}/follow`,
        this.$auth.headers
      )

      this.userFollows.splice(
        this.userFollows.indexOf(this.modpackage.packageId),
        1
      )
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
      title: this.modpackage.name + ' - Modrinth',
      meta: [
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.modpackage.name,
        },
        {
          hid: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          content: this.modpackage.name,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.modpackage.description,
        },
        {
          hid: 'description',
          name: 'description',
          content: `${this.modpackage.name}: ${this.modpackage.description} View other minecraft mods on Modrinth today! Modrinth is a new and modern Minecraft modding platform supporting both the Forge and Fabric mod loaders.`,
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: `https://modrinth.com/mod/${this.modpackage.packageId}`,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.modpackage.iconUrls[0]
            ? this.modpackage.iconUrls[0]
            : 'https://cdn.modrinth.com/placeholder.png',
        },
        {
          hid: 'robots',
          name: 'robots',
          content: this.modpackage.status !== 'approved' ? 'noindex' : 'all',
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

.modpackage-navigation {
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

.modpackage-info {
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

  .modpackage-stats {
    padding: 0.5rem;

    .modpackage-stats__info {
      display: flex;
      flex-wrap: wrap;
      p {
        // max-width: 6rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: '';
        margin: 3px;
      }
      .stat {
        min-width: 8.5rem;
        padding: 0.65rem;
        box-sizing: border-box;
        @extend %stat;

        svg {
          padding: 0.25rem;
          border-radius: 50%;
          background-color: var(--color-button-bg);
        }
      }
    }
    .modpackage-stats__categories {
      margin-top: 0.5rem;
      display: flex;
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
  .modpackage-navigation {
    display: block;
    overflow-x: auto;
    overflow-wrap: break-word;
    overflow-y: hidden;
  }
}
/*
@media screen and (max-width: 1400px) {
  .modpackage-info {
    display: none;
  }
}
*/
</style>
