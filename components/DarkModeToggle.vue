<template>
  <!-- Dark Mode Toggle -->
  <label class="relative flex flex-col items-center">
    <ClientOnly>
      <p
        class="dark:text-white text-black mb-[3px] text-[9px] font-black uppercase"
      >
        {{ $colorMode.value }} Mode
      </p>
    </ClientOnly>
    <input
      v-model="$colorMode.preference"
      true-value="dark"
      false-value="light"
      type="checkbox"
      class="absolute w-full h-full -translate-x-1/2 appearance-none rounded-xl left-1/2 peer"
    />
    <span
      class="flex relative items-center flex-shrink-0 h-[20px] p-1 duration-300 ease-in-out rounded-full w-11 bg-grey peer-checked:bg-yellow-300 after:w-[15px] after:h-[15px] after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-[1.25rem] group-hover:after:translate-x-1"
    >
      <Icon
        name="tabler:sun-high"
        class="absolute text-xs left-[.325rem] text-white"
      />
      <Icon
        name="teenyicons:moon-solid"
        class="absolute text-xs right-[.325rem] text-gray-600"
      />
    </span>
  </label>
</template>
