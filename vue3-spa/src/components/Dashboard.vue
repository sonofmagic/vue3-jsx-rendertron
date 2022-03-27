
<template>
  <div>
    <Disclosure v-slot="{ open }" as="nav" class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="hidden md:block">
              <div class="flex items-baseline space-x-4">
                <template v-for="(item, itemIdx) in navigation">
                  <template v-if="itemIdx === 0">
                    <a
                      :key="item"
                      href="https://www.icebreaker.top/"
                      class="
                        bg-gray-900
                        text-white
                        px-3
                        py-2
                        rounded-md
                        text-sm
                        font-medium
                      "
                      >{{ item }}</a
                    >
                  </template>
                  <a
                    v-else
                    :key="item"
                    href="https://www.icebreaker.top/"
                    class="
                      text-gray-300
                      hover:bg-gray-700 hover:text-white
                      px-3
                      py-2
                      rounded-md
                      text-sm
                      font-medium
                    "
                    >{{ item }}</a
                  >
                </template>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button
                class="
                  bg-gray-800
                  p-1
                  rounded-full
                  text-gray-400
                  hover:text-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-offset-gray-800
                  focus:ring-white
                "
              >
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="
                bg-gray-800
                inline-flex
                items-center
                justify-center
                p-2
                rounded-md
                text-gray-400
                hover:text-white hover:bg-gray-700
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-offset-gray-800
                focus:ring-white
              "
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <template v-for="(item, itemIdx) in navigation">
            <template v-if="itemIdx === 0">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <a
                :key="item"
                href="#"
                class="
                  bg-gray-900
                  text-white
                  block
                  px-3
                  py-2
                  rounded-md
                  text-base
                  font-medium
                "
                >{{ item }}</a
              >
            </template>
            <a
              v-else
              :key="item"
              href="#"
              class="
                text-gray-300
                hover:bg-gray-700 hover:text-white
                block
                px-3
                py-2
                rounded-md
                text-base
                font-medium
              "
              >{{ item }}</a
            >
          </template>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">
          icebreaker's serverless rendertron project
        </h1>
        <h2>
          网页上右键，查看源代码，你会发现
          <code>id 为 app 里的 div 空无一物</code>
        </h2>
        <h2>
          此时你打开 Network conditions ，更改自定义 User agent 为
          Google，刷新再看看，这就是这个项目的意义
        </h2>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <div class="border-4 border-dashed border-gray-200 rounded-lg">
            <div class="flex">
              <div class="mr-10">
                <img class="w-48" :src="logo" alt="icebreaker logo" />
              </div>

              <HelloWorld></HelloWorld>

              <div class="ml-10">
                <h2 v-for="w in keywords" :key="w">
                  <a href="https://www.icebreaker.top/" target="_blank">
                    {{ w }}</a
                  >
                </h2>
              </div>
            </div>
          </div>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import HelloWorld from '@/components/HelloWorld.jsx'
import { ref } from 'vue'
import keywords from './keywords'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  // Menu,
  // MenuButton,
  // MenuItem,
  // MenuItems,
} from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'

const navigation = ['首页', '博客', '知乎']

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    // Menu,
    // MenuButton,
    // MenuItem,
    // MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
    HelloWorld,
  },
  setup() {
    const open = ref(false)

    return {
      navigation,
      //profile,
      open,
      logo,
      keywords,
    }
  },
}
</script>
