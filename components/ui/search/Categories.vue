<template>
  <div class="categories">
    <div v-for="category in categories" :key="category">
      <p v-if="category.toLowerCase() === 'fabric'">
        <FabricIcon aria-hidden="true" />
        Fabric
      </p>
      <p v-else-if="category.toLowerCase() === 'forge'">
        <ForgeIcon aria-hidden="true" />
        Forge
      </p>
      <p v-else-if="category.toLowerCase() === 'technology'">
        <TechCategory aria-hidden="true" />
        Technology
      </p>
      <p v-else-if="category.toLowerCase() === 'adventure'">
        <AdventureCategory aria-hidden="true" />
        Adventure
      </p>
      <p v-else-if="category.toLowerCase() === 'magic'">
        <MagicCategory aria-hidden="true" />
        Magic
      </p>
      <p v-else-if="category.toLowerCase() === 'utility'">
        <UtilityCategory aria-hidden="true" />
        Utility
      </p>
      <p v-else-if="category.toLowerCase() === 'decoration'">
        <DecorationCategory aria-hidden="true" />
        Decoration
      </p>
      <p v-else-if="category.toLowerCase() === 'library'">
        <LibraryCategory aria-hidden="true" />
        Library
      </p>
      <p v-else-if="category.toLowerCase() === 'cursed'">
        <CursedCategory aria-hidden="true" />
        Cursed
      </p>
      <p v-else-if="category.toLowerCase() === 'worldgen'">
        <WorldGenCategory aria-hidden="true" />
        WorldGen
      </p>
      <p v-else-if="category.toLowerCase() === 'storage'">
        <StorageCategory aria-hidden="true" />
        Storage
      </p>
      <p v-else-if="category.toLowerCase() === 'food'">
        <FoodCategory aria-hidden="true" />
        Food
      </p>
      <p v-else-if="category.toLowerCase() === 'equipment'">
        <EquipmentCategory aria-hidden="true" />
        Equipment
      </p>
      <p v-else-if="category.toLowerCase() === 'miscellaneous'">
        <MiscCategory aria-hidden="true" />
        Misc
      </p>

      <p v-else>
        <MiscCategory aria-hidden="true" />
        {{ category }}
      </p>
    </div>
  </div>
</template>

<script>
import ForgeIcon from '~/assets/images/categories/forge.svg?inline'
import FabricIcon from '~/assets/images/categories/fabric.svg?inline'
import TechCategory from '~/assets/images/categories/tech.svg?inline'
import AdventureCategory from '~/assets/images/categories/adventure.svg?inline'
import CursedCategory from '~/assets/images/categories/cursed.svg?inline'
import DecorationCategory from '~/assets/images/categories/decoration.svg?inline'
import EquipmentCategory from '~/assets/images/categories/equipment.svg?inline'
import FoodCategory from '~/assets/images/categories/food.svg?inline'
import LibraryCategory from '~/assets/images/categories/library.svg?inline'
import MagicCategory from '~/assets/images/categories/magic.svg?inline'
import MiscCategory from '~/assets/images/categories/misc.svg?inline'
import StorageCategory from '~/assets/images/categories/storage.svg?inline'
import UtilityCategory from '~/assets/images/categories/utility.svg?inline'
import WorldGenCategory from '~/assets/images/categories/worldgen.svg?inline'

export default {
  name: 'Categories',
  components: {
    ForgeIcon,
    FabricIcon,
    TechCategory,
    AdventureCategory,
    CursedCategory,
    DecorationCategory,
    EquipmentCategory,
    FoodCategory,
    LibraryCategory,
    MagicCategory,
    MiscCategory,
    StorageCategory,
    UtilityCategory,
    WorldGenCategory,
  },
  props: {
    categories: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.categories {
  @extend %row;
  flex-wrap: wrap;

  p {
    display: flex;
    align-items: center;
    flex-direction: row;
    background-color: var(--color-category-bg);
    border-radius: var(--size-rounded-max);
    color: var(--color-category-text);
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    margin-right: 0.5em;
    padding: 0.4em 0.7em;
    font-size: var(--font-size-sm);
    height: 1em;
    svg {
      width: 15px;
      margin-right: 5px;
    }
  }
}
</style>
