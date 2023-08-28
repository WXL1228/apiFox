<template>
  <el-dialog
    :fullscreen="true"
    :title="titleName"
    width="90%"
    v-model="dialogVisible"
    @close="close"
    :destroy-on-close="true"
  >
    <el-form-item label="项目名称/ID:">{{ projectStore.projectName }}--------{{ projectStore.projectId }}</el-form-item>
    <el-form-item label="接口名称/ID:">{{ interfaceName }}--------{{ interfaceId }}</el-form-item>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="编辑" name="first">
        <el-descriptions size="large" v-if="isShow === 0" title="基本设置">
          <el-descriptions-item>
            <el-form ref="formRef" label-width="100px" :model="formData" :rules="rules">
              <el-form-item label="接口名称：" prop="name">
                <el-input v-model="formData.name" placeholder="请输入接口名称" />
              </el-form-item>
              <el-form-item label="接口地址：" prop="url">
                <el-input v-model="formData.url" placeholder="请输入接口地址"
                  ><template #prepend>http://</template>
                </el-input>
              </el-form-item>
              <el-form-item label="请求方法：" prop="method">
                <div>
                  <el-radio-group v-model="formData.method">
                    <el-radio-button label="GET" />
                    <el-radio-button label="POST" />
                    <el-radio-button label="PUT" />
                    <el-radio-button label="DELETE" />
                  </el-radio-group>
                </div>
              </el-form-item>
            </el-form>
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions size="large" v-if="isShow != 0" title="基本设置-(无权限)">
          <el-descriptions-item>
            <el-form ref="formRef" label-width="100px" :model="formData" :rules="rules">
              <el-form-item label="接口名称：" prop="name">
                <el-input disabled v-model="formData.name" placeholder="请输入接口名称" />
              </el-form-item>
              <el-form-item label="接口地址：" prop="url">
                <el-input disabled v-model="formData.url" placeholder="请输入接口地址"
                  ><template #prepend>http://</template></el-input
                >
              </el-form-item>
              <el-form-item label="请求方法：" prop="method">
                <div>
                  <el-radio-group disabled v-model="formData.method">
                    <el-radio-button label="GET" />
                    <el-radio-button label="POST" />
                    <el-radio-button label="PUT" />
                    <el-radio-button label="DELETE" />
                  </el-radio-group>
                </div>
              </el-form-item>
            </el-form>
          </el-descriptions-item>
        </el-descriptions>
        <el-divider />

        <el-descriptions size="large" :border="true" v-if="isShow != 2" title="请求参数设置">
          <el-descriptions-item label="Query"
            ><el-form autofocus :model="ruleForm" status-icon ref="formRef_1" label-width="100px">
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-form-item>
                    <el-button type="primary" @click="addQueryConfig">添加Query参数</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-for="(item, index) in ruleForm.QueryConfig" :key="index">
                <el-col :span="4">
                  <el-form-item label="参数名称:" prop="'name' + index">
                    <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="是/否必填:" prop="'is_have' + index">
                    <el-select v-model="item.is_have" autocomplete="off" placeholder="必需">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="参数类型:" prop="'format' + index">
                    <el-select v-model="item.format" autocomplete="off" placeholder="string">
                      <el-option v-for="item in options_1" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="参数示例:" prop="'dome' + index">
                    <el-input type="text" v-model="item.dome" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="备注:" prop="'remark' + index">
                    <el-input type="text" v-model="item.remark" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-button type="danger" :icon="Delete" circle @click.prevent="removeQueryConfig(item)" />
                </el-col>
              </el-row> </el-form
          ></el-descriptions-item>
        </el-descriptions>
        <el-descriptions v-if="flag_10 && isShow != 2" size="large" :border="true">
          <el-descriptions-item label="Body*">
            <el-form :model="ruleForm_1" status-icon ref="formRef_2" label-width="100px">
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-form-item>
                    <el-button type="primary" @click="addBodyConfig">添加Body*参数</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-for="(item, index) in ruleForm_1.BodyConfig" :key="index">
                <el-col :span="4">
                  <el-form-item label="参数名称:" prop="'name' + index">
                    <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="是/否必填:" prop="'is_have' + index">
                    <el-select v-model="item.is_have" autocomplete="off" placeholder="必需">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="参数类型:" prop="'format' + index">
                    <el-select v-model="item.format" autocomplete="off" placeholder="string">
                      <el-option v-for="item in options_1" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="参数示例:" prop="'dome' + index">
                    <el-input type="text" v-model="item.dome" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="备注:" prop="'remark' + index">
                    <el-input type="text" v-model="item.remark" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-button type="danger" :icon="Delete" circle @click.prevent="removeBodyConfig(item)" />
                </el-col>
              </el-row> </el-form
          ></el-descriptions-item>
        </el-descriptions>
        <el-descriptions size="large" :border="true" v-if="isShow === 2" title="请求参数设置-(无权限)">
          <el-descriptions-item label="Query"
            ><el-form disabled :model="ruleForm" status-icon ref="formRef_1" label-width="100px">
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-form-item>
                    <el-button type="primary" @click="addQueryConfig">添加Query参数</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-for="(item, index) in ruleForm.QueryConfig" :key="index">
                <el-col :span="4">
                  <el-form-item label="参数名称:" prop="'name' + index">
                    <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="是/否必填:" prop="'is_have' + index">
                    <el-select v-model="item.is_have" autocomplete="off" placeholder="必需">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="参数类型:" prop="'format' + index">
                    <el-select v-model="item.format" autocomplete="off" placeholder="string">
                      <el-option v-for="item in options_1" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="参数示例:" prop="'dome' + index">
                    <el-input type="text" v-model="item.dome" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="备注:" prop="'remark' + index">
                    <el-input type="text" v-model="item.remark" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-button type="danger" :icon="Delete" circle @click.prevent="removeQueryConfig(item)" />
                </el-col>
              </el-row> </el-form
          ></el-descriptions-item>
        </el-descriptions>
        <el-descriptions v-if="flag_10 && isShow === 2" size="large" :border="true">
          <el-descriptions-item label="Body*">
            <el-form disabled :model="ruleForm_1" status-icon ref="formRef_2" label-width="100px">
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-form-item>
                    <el-button type="primary" @click="addBodyConfig">添加Body*参数</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-for="(item, index) in ruleForm_1.BodyConfig" :key="index">
                <el-col :span="4">
                  <el-form-item label="参数名称:" prop="'name' + index">
                    <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="是/否必填:" prop="'is_have' + index">
                    <el-select v-model="item.is_have" autocomplete="off" placeholder="必需">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="参数类型:" prop="'format' + index">
                    <el-select v-model="item.format" autocomplete="off" placeholder="string">
                      <el-option v-for="item in options_1" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="参数示例:" prop="'dome' + index">
                    <el-input type="text" v-model="item.dome" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="备注:" prop="'remark' + index">
                    <el-input type="text" v-model="item.remark" autocomplete="off" maxlength="50" />
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-button type="danger" :icon="Delete" circle @click.prevent="removeBodyConfig(item)" />
                </el-col>
              </el-row> </el-form
          ></el-descriptions-item>
        </el-descriptions>
        <el-divider />
        <el-descriptions size="large" v-if="isShow != 2" title="返回数据设置" />
        <el-radio-group v-if="isShow != 2" v-model="radio" @change="setFlag">
          <el-radio :label="3">JSON</el-radio>
          <el-radio :label="6">XML</el-radio>
          <el-radio :label="9">HTML</el-radio>
          <el-radio :label="12">RAW</el-radio>
        </el-radio-group>

        <el-descriptions v-if="flag && isShow != 2" size="large" :border="true">
          <el-descriptions-item label="模板">
            <el-form :model="ruleForm_2" status-icon ref="formRef_3" label-width="100px">
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-form-item>
                    <el-button size="small" round @click="editProject">导入JSON/XML</el-button>
                  </el-form-item> </el-col
                ><el-button size="small" type="primary" :icon="RefreshRight" circle @click="resetTableData" />
              </el-row>
              <el-row :gutter="20" v-for="(item, index) in ruleForm_2.returnConfig" :key="index">
                <el-col :span="4">
                  <el-form-item prop="'name' + index">
                    <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" placeholder="节点" />
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item prop="'is_have' + index">
                    <el-select v-model="item.is_have" autocomplete="off" placeholder="必需">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item prop="'format' + index">
                    <el-select v-model="item.format" autocomplete="off" placeholder="string">
                      <el-option v-for="item in options_2" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item prop="'http_dome' + index">
                    <el-input
                      type="text"
                      v-model="item.http_dome"
                      autocomplete="off"
                      maxlength="50"
                      placeholder="中文名"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item prop="'remark' + index">
                    <el-input type="text" v-model="item.remark" autocomplete="off" maxlength="50" placeholder="备注" />
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-button type="success" :icon="Plus" circle @click="addReturnConfig" />
                  <el-button type="danger" :icon="Delete" circle @click.prevent="removeReturnConfig(item)" />
                </el-col>
                <el-from
                  v-if="item.format.includes('object') || item.format.includes('array') || item.format.includes('any')"
                  :model="item"
                  :gutter="20"
                  status-icon
                  label-width="100px"
                  class="ml-8"
                >
                  <el-row :gutter="20" v-for="(item1, index) in item.node" :key="index">
                    <el-col :span="4">
                      <el-form-item prop="'name' + index">
                        <el-input
                          type="text"
                          v-model="item1.name"
                          autocomplete="off"
                          maxlength="50"
                          placeholder="节点"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item prop="'is_have' + index">
                        <el-select v-model="item1.is_have" autocomplete="off" placeholder="必需">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item prop="'format' + index">
                        <el-select v-model="item1.format" autocomplete="off" placeholder="string">
                          <el-option
                            v-for="item in options_2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item prop="'http_dome' + index">
                        <el-input
                          type="text"
                          v-model="item1.http_dome"
                          autocomplete="off"
                          maxlength="50"
                          placeholder="中文名"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item prop="'remark' + index">
                        <el-input
                          type="text"
                          v-model="item1.remark"
                          autocomplete="off"
                          maxlength="50"
                          placeholder="备注"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-button type="success" :icon="Plus" circle @click="addReturnConfig1(item)" />
                      <el-button
                        type="danger"
                        :icon="Delete"
                        circle
                        @click.prevent="removeReturnConfig1(item1, item)"
                      />
                    </el-col>
                    <el-from
                      v-if="
                        item1.format.includes('object') ||
                        item1.format.includes('array') ||
                        item1.format.includes('any')
                      "
                      :model="item1"
                      :gutter="20"
                      status-icon
                      label-width="100px"
                      class="ml-8"
                    >
                      <el-row :gutter="20" v-for="(item2, index) in item1.node" :key="index">
                        <el-col :span="4">
                          <el-form-item prop="'name' + index">
                            <el-input
                              type="text"
                              v-model="item2.name"
                              autocomplete="off"
                              maxlength="50"
                              placeholder="节点"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <el-form-item prop="'is_have' + index">
                            <el-select v-model="item2.is_have" autocomplete="off" placeholder="必需">
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <el-form-item prop="'format' + index">
                            <el-select v-model="item2.format" autocomplete="off" placeholder="string">
                              <el-option
                                v-for="item in options_2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item prop="'http_dome' + index">
                            <el-input
                              type="text"
                              v-model="item2.http_dome"
                              autocomplete="off"
                              maxlength="50"
                              placeholder="中文名"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item prop="'remark' + index">
                            <el-input
                              type="text"
                              v-model="item2.remark"
                              autocomplete="off"
                              maxlength="50"
                              placeholder="备注"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                          <el-button type="success" :icon="Plus" circle @click="addReturnConfig2(item1)" />
                          <el-button
                            type="danger"
                            :icon="Delete"
                            circle
                            @click.prevent="removeReturnConfig2(item2, item1)"
                          />
                        </el-col>
                        <el-from
                          v-if="
                            item2.format.includes('object') ||
                            item2.format.includes('array') ||
                            item2.format.includes('any')
                          "
                          :model="item2"
                          :gutter="20"
                          status-icon
                          label-width="100px"
                          class="ml-8"
                        >
                          <el-row :gutter="20" v-for="(item3, index) in item2.node" :key="index">
                            <el-col :span="4">
                              <el-form-item prop="'name' + index">
                                <el-input
                                  type="text"
                                  v-model="item3.name"
                                  autocomplete="off"
                                  maxlength="50"
                                  placeholder="节点"
                                />
                              </el-form-item>
                            </el-col>
                            <el-col :span="3">
                              <el-form-item prop="'is_have' + index">
                                <el-select v-model="item3.is_have" autocomplete="off" placeholder="必需">
                                  <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                  />
                                </el-select>
                              </el-form-item>
                            </el-col>
                            <el-col :span="3">
                              <el-form-item prop="'format' + index">
                                <el-select v-model="item3.format" autocomplete="off" placeholder="string">
                                  <el-option
                                    v-for="item in options_2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                  />
                                </el-select>
                              </el-form-item>
                            </el-col>
                            <el-col :span="5">
                              <el-form-item prop="'http_dome' + index">
                                <el-input
                                  type="text"
                                  v-model="item3.http_dome"
                                  autocomplete="off"
                                  maxlength="50"
                                  placeholder="中文名"
                                />
                              </el-form-item>
                            </el-col>
                            <el-col :span="5">
                              <el-form-item prop="'remark' + index">
                                <el-input
                                  type="text"
                                  v-model="item3.remark"
                                  autocomplete="off"
                                  maxlength="50"
                                  placeholder="备注"
                                />
                              </el-form-item>
                            </el-col>
                            <el-col :span="4">
                              <el-button type="success" :icon="Plus" circle @click="addReturnConfig3(item2)" />
                              <el-button
                                type="danger"
                                :icon="Delete"
                                circle
                                @click.prevent="removeReturnConfig3(item3, item2)"
                              />
                            </el-col>
                            <el-from
                              v-if="
                                item3.format.includes('object') ||
                                item3.format.includes('array') ||
                                item3.format.includes('any')
                              "
                              :model="item3"
                              :gutter="20"
                              status-icon
                              label-width="100px"
                              class="ml-8"
                            >
                              <el-row :gutter="20" v-for="(item4, index) in item3.node" :key="index">
                                <el-col :span="4">
                                  <el-form-item prop="'name' + index">
                                    <el-input
                                      type="text"
                                      v-model="item4.name"
                                      autocomplete="off"
                                      maxlength="50"
                                      placeholder="节点"
                                    />
                                  </el-form-item>
                                </el-col>
                                <el-col :span="3">
                                  <el-form-item prop="'is_have' + index">
                                    <el-select v-model="item4.is_have" autocomplete="off" placeholder="必需">
                                      <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                      />
                                    </el-select>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="3">
                                  <el-form-item prop="'format' + index">
                                    <el-select v-model="item4.format" autocomplete="off" placeholder="string">
                                      <el-option
                                        v-for="item in options_2"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                      />
                                    </el-select>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                  <el-form-item prop="'http_dome' + index">
                                    <el-input
                                      type="text"
                                      v-model="item4.http_dome"
                                      autocomplete="off"
                                      maxlength="50"
                                      placeholder="中文名"
                                    />
                                  </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                  <el-form-item prop="'remark' + index">
                                    <el-input
                                      type="text"
                                      v-model="item4.remark"
                                      autocomplete="off"
                                      maxlength="50"
                                      placeholder="备注"
                                    />
                                  </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                  <el-button type="success" :icon="Plus" circle @click="addReturnConfig4(item3)" />
                                  <el-button
                                    type="danger"
                                    :icon="Delete"
                                    circle
                                    @click.prevent="removeReturnConfig4(item4, item3)"
                                  />
                                </el-col>
                                <el-from
                                  v-if="
                                    item4.format.includes('object') ||
                                    item4.format.includes('array') ||
                                    item4.format.includes('any')
                                  "
                                  :model="item4"
                                  :gutter="20"
                                  status-icon
                                  label-width="100px"
                                  class="ml-8"
                                >
                                  <el-row :gutter="20" v-for="(item5, index) in item4.node" :key="index">
                                    <el-col :span="4">
                                      <el-form-item prop="'name' + index">
                                        <el-input
                                          type="text"
                                          v-model="item5.name"
                                          autocomplete="off"
                                          maxlength="50"
                                          placeholder="节点"
                                        />
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                      <el-form-item prop="'is_have' + index">
                                        <el-select v-model="item5.is_have" autocomplete="off" placeholder="必需">
                                          <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                          />
                                        </el-select>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                      <el-form-item prop="'format' + index">
                                        <el-select v-model="item5.format" autocomplete="off" placeholder="string">
                                          <el-option
                                            v-for="item in options_2"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                          />
                                        </el-select>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="5">
                                      <el-form-item prop="'http_dome' + index">
                                        <el-input
                                          type="text"
                                          v-model="item5.http_dome"
                                          autocomplete="off"
                                          maxlength="50"
                                          placeholder="中文名"
                                        />
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="5">
                                      <el-form-item prop="'remark' + index">
                                        <el-input
                                          type="text"
                                          v-model="item5.remark"
                                          autocomplete="off"
                                          maxlength="50"
                                          placeholder="备注"
                                        />
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="4">
                                      <el-button type="success" :icon="Plus" circle @click="addReturnConfig5(item4)" />
                                      <el-button
                                        type="danger"
                                        :icon="Delete"
                                        circle
                                        @click.prevent="removeReturnConfig5(item5, item4)"
                                      />
                                    </el-col>
                                    <el-from
                                      v-if="
                                        item5.format.includes('object') ||
                                        item5.format.includes('array') ||
                                        item5.format.includes('any')
                                      "
                                      :model="item5"
                                      :gutter="20"
                                      status-icon
                                      label-width="100px"
                                      class="ml-8"
                                    >
                                      <el-row :gutter="20" v-for="(item6, index) in item5.node" :key="index">
                                        <el-col :span="4">
                                          <el-form-item prop="'name' + index">
                                            <el-input
                                              type="text"
                                              v-model="item6.name"
                                              autocomplete="off"
                                              maxlength="50"
                                              placeholder="节点"
                                            />
                                          </el-form-item>
                                        </el-col>
                                        <el-col :span="3">
                                          <el-form-item prop="'is_have' + index">
                                            <el-select v-model="item6.is_have" autocomplete="off" placeholder="必需">
                                              <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                              />
                                            </el-select>
                                          </el-form-item>
                                        </el-col>
                                        <el-col :span="3">
                                          <el-form-item prop="'format' + index">
                                            <el-select v-model="item6.format" autocomplete="off" placeholder="string">
                                              <el-option
                                                v-for="item in options_2"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                              />
                                            </el-select>
                                          </el-form-item>
                                        </el-col>
                                        <el-col :span="5">
                                          <el-form-item prop="'http_dome' + index">
                                            <el-input
                                              type="text"
                                              v-model="item6.http_dome"
                                              autocomplete="off"
                                              maxlength="50"
                                              placeholder="中文名"
                                            />
                                          </el-form-item>
                                        </el-col>
                                        <el-col :span="5">
                                          <el-form-item prop="'remark' + index">
                                            <el-input
                                              type="text"
                                              v-model="item6.remark"
                                              autocomplete="off"
                                              maxlength="50"
                                              placeholder="备注"
                                            />
                                          </el-form-item>
                                        </el-col>
                                        <el-col :span="4">
                                          <el-button
                                            type="success"
                                            :icon="Plus"
                                            circle
                                            @click="addReturnConfig6(item5)"
                                          />
                                          <el-button
                                            type="danger"
                                            :icon="Delete"
                                            circle
                                            @click.prevent="removeReturnConfig6(item6, item5)"
                                          />
                                        </el-col>
                                        <el-from
                                          v-if="
                                            item6.format.includes('object') ||
                                            item6.format.includes('array') ||
                                            item6.format.includes('any')
                                          "
                                          :model="item6"
                                          :gutter="20"
                                          status-icon
                                          label-width="100px"
                                          class="ml-8"
                                        >
                                          <el-row :gutter="20" v-for="(item7, index) in item6.node" :key="index">
                                            <el-col :span="4">
                                              <el-form-item prop="'name' + index">
                                                <el-input
                                                  type="text"
                                                  v-model="item7.name"
                                                  autocomplete="off"
                                                  maxlength="50"
                                                  placeholder="节点"
                                                />
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="3">
                                              <el-form-item prop="'is_have' + index">
                                                <el-select
                                                  v-model="item7.is_have"
                                                  autocomplete="off"
                                                  placeholder="必需"
                                                >
                                                  <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                                  />
                                                </el-select>
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="3">
                                              <el-form-item prop="'format' + index">
                                                <el-select
                                                  v-model="item7.format"
                                                  autocomplete="off"
                                                  placeholder="string"
                                                >
                                                  <el-option
                                                    v-for="item in options_2"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                                  />
                                                </el-select>
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="5">
                                              <el-form-item prop="'http_dome' + index">
                                                <el-input
                                                  type="text"
                                                  v-model="item7.http_dome"
                                                  autocomplete="off"
                                                  maxlength="50"
                                                  placeholder="中文名"
                                                />
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="5">
                                              <el-form-item prop="'remark' + index">
                                                <el-input
                                                  type="text"
                                                  v-model="item7.remark"
                                                  autocomplete="off"
                                                  maxlength="50"
                                                  placeholder="备注"
                                                />
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="4">
                                              <el-button
                                                type="success"
                                                :icon="Plus"
                                                circle
                                                @click="addReturnConfig7(item6)"
                                              />
                                              <el-button
                                                type="danger"
                                                :icon="Delete"
                                                circle
                                                @click.prevent="removeReturnConfig7(item7, item6)"
                                              />
                                            </el-col>
                                            <el-from
                                              v-if="
                                                item7.format.includes('object') ||
                                                item7.format.includes('array') ||
                                                item7.format.includes('any')
                                              "
                                              :model="item7"
                                              :gutter="20"
                                              status-icon
                                              label-width="100px"
                                              class="ml-8"
                                            >
                                              <el-row :gutter="20" v-for="(item8, index) in item7.node" :key="index">
                                                <el-col :span="4">
                                                  <el-form-item prop="'name' + index">
                                                    <el-input
                                                      type="text"
                                                      v-model="item8.name"
                                                      autocomplete="off"
                                                      maxlength="50"
                                                      placeholder="节点"
                                                    />
                                                  </el-form-item>
                                                </el-col>
                                                <el-col :span="3">
                                                  <el-form-item prop="'is_have' + index">
                                                    <el-select
                                                      v-model="item8.is_have"
                                                      autocomplete="off"
                                                      placeholder="必需"
                                                    >
                                                      <el-option
                                                        v-for="item in options"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                      />
                                                    </el-select>
                                                  </el-form-item>
                                                </el-col>
                                                <el-col :span="3">
                                                  <el-form-item prop="'format' + index">
                                                    <el-select
                                                      v-model="item8.format"
                                                      autocomplete="off"
                                                      placeholder="string"
                                                    >
                                                      <el-option
                                                        v-for="item in options_2"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                      />
                                                    </el-select>
                                                  </el-form-item>
                                                </el-col>
                                                <el-col :span="5">
                                                  <el-form-item prop="'http_dome' + index">
                                                    <el-input
                                                      type="text"
                                                      v-model="item8.http_dome"
                                                      autocomplete="off"
                                                      maxlength="50"
                                                      placeholder="中文名"
                                                    />
                                                  </el-form-item>
                                                </el-col>
                                                <el-col :span="5">
                                                  <el-form-item prop="'remark' + index">
                                                    <el-input
                                                      type="text"
                                                      v-model="item8.remark"
                                                      autocomplete="off"
                                                      maxlength="50"
                                                      placeholder="备注"
                                                    />
                                                  </el-form-item>
                                                </el-col>
                                                <el-col :span="4">
                                                  <el-button
                                                    type="success"
                                                    :icon="Plus"
                                                    circle
                                                    @click="addReturnConfig8(item7)"
                                                  />
                                                  <el-button
                                                    type="danger"
                                                    :icon="Delete"
                                                    circle
                                                    @click.prevent="removeReturnConfig8(item8, item7)"
                                                  />
                                                </el-col>
                                                <el-from
                                                  v-if="
                                                    item8.format.includes('object') ||
                                                    item8.format.includes('array') ||
                                                    item8.format.includes('any')
                                                  "
                                                  :model="item8"
                                                  :gutter="20"
                                                  status-icon
                                                  label-width="100px"
                                                  class="ml-8"
                                                >
                                                  <el-row
                                                    :gutter="20"
                                                    v-for="(item9, index) in item8.node"
                                                    :key="index"
                                                  >
                                                    <el-col :span="4">
                                                      <el-form-item prop="'name' + index">
                                                        <el-input
                                                          type="text"
                                                          v-model="item9.name"
                                                          autocomplete="off"
                                                          maxlength="50"
                                                          placeholder="节点"
                                                        />
                                                      </el-form-item>
                                                    </el-col>
                                                    <el-col :span="3">
                                                      <el-form-item prop="'is_have' + index">
                                                        <el-select
                                                          v-model="item9.is_have"
                                                          autocomplete="off"
                                                          placeholder="必需"
                                                        >
                                                          <el-option
                                                            v-for="item in options"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value"
                                                          />
                                                        </el-select>
                                                      </el-form-item>
                                                    </el-col>
                                                    <el-col :span="3">
                                                      <el-form-item prop="'format' + index">
                                                        <el-select
                                                          v-model="item9.format"
                                                          autocomplete="off"
                                                          placeholder="string"
                                                        >
                                                          <el-option
                                                            v-for="item in options_2"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value"
                                                          />
                                                        </el-select>
                                                      </el-form-item>
                                                    </el-col>
                                                    <el-col :span="5">
                                                      <el-form-item prop="'http_dome' + index">
                                                        <el-input
                                                          type="text"
                                                          v-model="item9.http_dome"
                                                          autocomplete="off"
                                                          maxlength="50"
                                                          placeholder="中文名"
                                                        />
                                                      </el-form-item>
                                                    </el-col>
                                                    <el-col :span="5">
                                                      <el-form-item prop="'remark' + index">
                                                        <el-input
                                                          type="text"
                                                          v-model="item9.remark"
                                                          autocomplete="off"
                                                          maxlength="50"
                                                          placeholder="备注"
                                                        />
                                                      </el-form-item>
                                                    </el-col>
                                                    <el-col :span="4">
                                                      <el-button
                                                        type="success"
                                                        :icon="Plus"
                                                        circle
                                                        @click="addReturnConfig9(item8)"
                                                      />
                                                      <el-button
                                                        type="danger"
                                                        :icon="Delete"
                                                        circle
                                                        @click.prevent="removeReturnConfig9(item9, item8)"
                                                      />
                                                    </el-col>
                                                    <el-from
                                                      v-if="
                                                        item9.format.includes('object') ||
                                                        item9.format.includes('array') ||
                                                        item9.format.includes('any')
                                                      "
                                                      :model="item9"
                                                      :gutter="20"
                                                      status-icon
                                                      label-width="100px"
                                                      class="ml-8"
                                                    >
                                                      <el-row
                                                        :gutter="20"
                                                        v-for="(item10, index) in item9.node"
                                                        :key="index"
                                                      >
                                                        <el-col :span="4">
                                                          <el-form-item prop="'name' + index">
                                                            <el-input
                                                              type="text"
                                                              v-model="item10.name"
                                                              autocomplete="off"
                                                              maxlength="50"
                                                              placeholder="节点"
                                                            />
                                                          </el-form-item>
                                                        </el-col>
                                                        <el-col :span="3">
                                                          <el-form-item prop="'is_have' + index">
                                                            <el-select
                                                              v-model="item10.is_have"
                                                              autocomplete="off"
                                                              placeholder="必需"
                                                            >
                                                              <el-option
                                                                v-for="item in options"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value"
                                                              />
                                                            </el-select>
                                                          </el-form-item>
                                                        </el-col>
                                                        <el-col :span="3">
                                                          <el-form-item prop="'format' + index">
                                                            <el-select
                                                              v-model="item10.format"
                                                              autocomplete="off"
                                                              placeholder="string"
                                                            >
                                                              <el-option
                                                                v-for="item in options_2"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value"
                                                              />
                                                            </el-select>
                                                          </el-form-item>
                                                        </el-col>
                                                        <el-col :span="5">
                                                          <el-form-item prop="'http_dome' + index">
                                                            <el-input
                                                              type="text"
                                                              v-model="item10.http_dome"
                                                              autocomplete="off"
                                                              maxlength="50"
                                                              placeholder="中文名"
                                                            />
                                                          </el-form-item>
                                                        </el-col>
                                                        <el-col :span="5">
                                                          <el-form-item prop="'remark' + index">
                                                            <el-input
                                                              type="text"
                                                              v-model="item10.remark"
                                                              autocomplete="off"
                                                              maxlength="50"
                                                              placeholder="备注"
                                                            />
                                                          </el-form-item>
                                                        </el-col>
                                                        <el-col :span="4">
                                                          <el-button
                                                            type="success"
                                                            :icon="Plus"
                                                            circle
                                                            @click="addReturnConfig10(item9)"
                                                          />
                                                          <el-button
                                                            type="danger"
                                                            :icon="Delete"
                                                            circle
                                                            @click.prevent="removeReturnConfig10(item10, item9)"
                                                          /> </el-col></el-row></el-from></el-row></el-from></el-row></el-from></el-row></el-from></el-row></el-from></el-row></el-from></el-row></el-from></el-row></el-from></el-row></el-from></el-row
                ></el-from>
              </el-row> </el-form
          ></el-descriptions-item>
        </el-descriptions>

        <el-descriptions v-if="!flag && isShow != 2" size="large" :border="true">
          <el-descriptions-item label="预览"><el-input v-model="v_input" /></el-descriptions-item>
        </el-descriptions>

        <el-descriptions size="large" v-if="isShow == 2" title="返回数据设置-(无权限)" />
        <el-radio-group v-if="isShow == 2" disabled v-model="radio" @change="setFlag">
          <el-radio :label="3">JSON</el-radio>
          <el-radio :label="6">XML</el-radio>
          <el-radio :label="9">HTML</el-radio>
          <el-radio :label="12">RAW</el-radio>
        </el-radio-group>
        <el-descriptions v-if="flag && isShow === 2" size="large" :border="true">
          <el-descriptions-item label="模板">
            <el-form disabled :model="ruleForm_2" status-icon ref="formRef_3" label-width="100px">
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-form-item>
                    <el-button size="small" round @click="editProject">导入JSON/XML</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-for="item in ruleForm_2.returnConfig" :key="item.name">
                <el-col :span="4">
                  <el-form-item prop="'name' + index">
                    <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" placeholder="节点" />
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item prop="'is_have' + index">
                    <el-select v-model="item.is_have" autocomplete="off" placeholder="必需">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item prop="'format' + index">
                    <el-select v-model="item.format" autocomplete="off" placeholder="string">
                      <el-option v-for="item in options_2" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item prop="'http_dome' + index">
                    <el-input
                      type="text"
                      v-model="item.http_dome"
                      autocomplete="off"
                      maxlength="50"
                      placeholder="中文名"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item prop="'remark' + index">
                    <el-input type="text" v-model="item.remark" autocomplete="off" maxlength="50" placeholder="备注" />
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-button type="success" :icon="Plus" circle @click="addReturnConfig" />
                  <el-button type="danger" :icon="Delete" circle @click.prevent="removeReturnConfig(item)" />
                </el-col>
                <el-from
                  v-if="item.format.includes('object') || item.format.includes('array') || item.format.includes('any')"
                  :model="item"
                  :gutter="20"
                  status-icon
                  label-width="100px"
                  class="ml-8"
                >
                  <el-row :gutter="20" v-for="item1 in item.node" :key="item1.name">
                    <el-col :span="4">
                      <el-form-item prop="'name' + index">
                        <el-input
                          type="text"
                          v-model="item1.name"
                          autocomplete="off"
                          maxlength="50"
                          placeholder="节点"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item prop="'is_have' + index">
                        <el-select v-model="item1.is_have" autocomplete="off" placeholder="必需">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item prop="'format' + index">
                        <el-select v-model="item1.format" autocomplete="off" placeholder="string">
                          <el-option
                            v-for="item in options_2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item prop="'http_dome' + index">
                        <el-input
                          type="text"
                          v-model="item1.http_dome"
                          autocomplete="off"
                          maxlength="50"
                          placeholder="中文名"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item prop="'remark' + index">
                        <el-input
                          type="text"
                          v-model="item1.remark"
                          autocomplete="off"
                          maxlength="50"
                          placeholder="备注"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-button type="success" :icon="Plus" circle @click="addReturnConfig1(item)" />
                      <el-button
                        type="danger"
                        :icon="Delete"
                        circle
                        @click.prevent="removeReturnConfig1(item1, item)"
                      />
                    </el-col>
                    <el-from
                      v-if="
                        item1.format.includes('object') ||
                        item1.format.includes('array') ||
                        item1.format.includes('any')
                      "
                      :model="item1"
                      :gutter="20"
                      status-icon
                      label-width="100px"
                      class="ml-8"
                    >
                      <el-row :gutter="20" v-for="item2 in item1.node" :key="item2.name">
                        <el-col :span="4">
                          <el-form-item prop="'name' + index">
                            <el-input
                              type="text"
                              v-model="item2.name"
                              autocomplete="off"
                              maxlength="50"
                              placeholder="节点"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <el-form-item prop="'is_have' + index">
                            <el-select v-model="item2.is_have" autocomplete="off" placeholder="必需">
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <el-form-item prop="'format' + index">
                            <el-select v-model="item2.format" autocomplete="off" placeholder="string">
                              <el-option
                                v-for="item in options_2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item prop="'http_dome' + index">
                            <el-input
                              type="text"
                              v-model="item2.http_dome"
                              autocomplete="off"
                              maxlength="50"
                              placeholder="中文名"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item prop="'remark' + index">
                            <el-input
                              type="text"
                              v-model="item2.remark"
                              autocomplete="off"
                              maxlength="50"
                              placeholder="备注"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                          <el-button type="success" :icon="Plus" circle @click="addReturnConfig2(item1)" />
                          <el-button
                            type="danger"
                            :icon="Delete"
                            circle
                            @click.prevent="removeReturnConfig2(item2, item1)"
                          />
                        </el-col>
                        <el-from
                          v-if="
                            item2.format.includes('object') ||
                            item2.format.includes('array') ||
                            item2.format.includes('any')
                          "
                          :model="item2"
                          :gutter="20"
                          status-icon
                          label-width="100px"
                          class="ml-8"
                        >
                          <el-row :gutter="20" v-for="item3 in item2.node" :key="item3.name">
                            <el-col :span="4">
                              <el-form-item prop="'name' + index">
                                <el-input
                                  type="text"
                                  v-model="item3.name"
                                  autocomplete="off"
                                  maxlength="50"
                                  placeholder="节点"
                                />
                              </el-form-item>
                            </el-col>
                            <el-col :span="3">
                              <el-form-item prop="'is_have' + index">
                                <el-select v-model="item3.is_have" autocomplete="off" placeholder="必需">
                                  <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                  />
                                </el-select>
                              </el-form-item>
                            </el-col>
                            <el-col :span="3">
                              <el-form-item prop="'format' + index">
                                <el-select v-model="item3.format" autocomplete="off" placeholder="string">
                                  <el-option
                                    v-for="item in options_2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                  />
                                </el-select>
                              </el-form-item>
                            </el-col>
                            <el-col :span="5">
                              <el-form-item prop="'http_dome' + index">
                                <el-input
                                  type="text"
                                  v-model="item3.http_dome"
                                  autocomplete="off"
                                  maxlength="50"
                                  placeholder="中文名"
                                />
                              </el-form-item>
                            </el-col>
                            <el-col :span="5">
                              <el-form-item prop="'remark' + index">
                                <el-input
                                  type="text"
                                  v-model="item3.remark"
                                  autocomplete="off"
                                  maxlength="50"
                                  placeholder="备注"
                                />
                              </el-form-item>
                            </el-col>
                            <el-col :span="4">
                              <el-button type="success" :icon="Plus" circle @click="addReturnConfig3(item2)" />
                              <el-button
                                type="danger"
                                :icon="Delete"
                                circle
                                @click.prevent="removeReturnConfig3(item3, item2)"
                              />
                            </el-col>
                            <el-from
                              v-if="
                                item3.format.includes('object') ||
                                item3.format.includes('array') ||
                                item3.format.includes('any')
                              "
                              :model="item3"
                              :gutter="20"
                              status-icon
                              label-width="100px"
                              class="ml-8"
                            >
                              <el-row :gutter="20" v-for="item4 in item3.node" :key="item4.name">
                                <el-col :span="4">
                                  <el-form-item prop="'name' + index">
                                    <el-input
                                      type="text"
                                      v-model="item4.name"
                                      autocomplete="off"
                                      maxlength="50"
                                      placeholder="节点"
                                    />
                                  </el-form-item>
                                </el-col>
                                <el-col :span="3">
                                  <el-form-item prop="'is_have' + index">
                                    <el-select v-model="item4.is_have" autocomplete="off" placeholder="必需">
                                      <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                      />
                                    </el-select>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="3">
                                  <el-form-item prop="'format' + index">
                                    <el-select v-model="item4.format" autocomplete="off" placeholder="string">
                                      <el-option
                                        v-for="item in options_2"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                      />
                                    </el-select>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                  <el-form-item prop="'http_dome' + index">
                                    <el-input
                                      type="text"
                                      v-model="item4.http_dome"
                                      autocomplete="off"
                                      maxlength="50"
                                      placeholder="中文名"
                                    />
                                  </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                  <el-form-item prop="'remark' + index">
                                    <el-input
                                      type="text"
                                      v-model="item4.remark"
                                      autocomplete="off"
                                      maxlength="50"
                                      placeholder="备注"
                                    />
                                  </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                  <el-button type="success" :icon="Plus" circle @click="addReturnConfig4(item3)" />
                                  <el-button
                                    type="danger"
                                    :icon="Delete"
                                    circle
                                    @click.prevent="removeReturnConfig4(item4, item3)"
                                  />
                                </el-col>
                                <el-from
                                  v-if="
                                    item4.format.includes('object') ||
                                    item4.format.includes('array') ||
                                    item4.format.includes('any')
                                  "
                                  :model="item4"
                                  :gutter="20"
                                  status-icon
                                  label-width="100px"
                                  class="ml-8"
                                >
                                  <el-row :gutter="20" v-for="item5 in item4.node" :key="item5.name">
                                    <el-col :span="4">
                                      <el-form-item prop="'name' + index">
                                        <el-input
                                          type="text"
                                          v-model="item5.name"
                                          autocomplete="off"
                                          maxlength="50"
                                          placeholder="节点"
                                        />
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                      <el-form-item prop="'is_have' + index">
                                        <el-select v-model="item5.is_have" autocomplete="off" placeholder="必需">
                                          <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                          />
                                        </el-select>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                      <el-form-item prop="'format' + index">
                                        <el-select v-model="item5.format" autocomplete="off" placeholder="string">
                                          <el-option
                                            v-for="item in options_2"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                          />
                                        </el-select>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="5">
                                      <el-form-item prop="'http_dome' + index">
                                        <el-input
                                          type="text"
                                          v-model="item5.http_dome"
                                          autocomplete="off"
                                          maxlength="50"
                                          placeholder="中文名"
                                        />
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="5">
                                      <el-form-item prop="'remark' + index">
                                        <el-input
                                          type="text"
                                          v-model="item5.remark"
                                          autocomplete="off"
                                          maxlength="50"
                                          placeholder="备注"
                                        />
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="4">
                                      <el-button type="success" :icon="Plus" circle @click="addReturnConfig5(item4)" />
                                      <el-button
                                        type="danger"
                                        :icon="Delete"
                                        circle
                                        @click.prevent="removeReturnConfig5(item5, item4)"
                                      />
                                    </el-col>
                                    <el-from
                                      v-if="
                                        item5.format.includes('object') ||
                                        item5.format.includes('array') ||
                                        item5.format.includes('any')
                                      "
                                      :model="item5"
                                      :gutter="20"
                                      status-icon
                                      label-width="100px"
                                      class="ml-8"
                                    >
                                      <el-row :gutter="20" v-for="item6 in item5.node" :key="item6.name">
                                        <el-col :span="4">
                                          <el-form-item prop="'name' + index">
                                            <el-input
                                              type="text"
                                              v-model="item6.name"
                                              autocomplete="off"
                                              maxlength="50"
                                              placeholder="节点"
                                            />
                                          </el-form-item>
                                        </el-col>
                                        <el-col :span="3">
                                          <el-form-item prop="'is_have' + index">
                                            <el-select v-model="item6.is_have" autocomplete="off" placeholder="必需">
                                              <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                              />
                                            </el-select>
                                          </el-form-item>
                                        </el-col>
                                        <el-col :span="3">
                                          <el-form-item prop="'format' + index">
                                            <el-select v-model="item6.format" autocomplete="off" placeholder="string">
                                              <el-option
                                                v-for="item in options_2"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                              />
                                            </el-select>
                                          </el-form-item>
                                        </el-col>
                                        <el-col :span="5">
                                          <el-form-item prop="'http_dome' + index">
                                            <el-input
                                              type="text"
                                              v-model="item6.http_dome"
                                              autocomplete="off"
                                              maxlength="50"
                                              placeholder="中文名"
                                            />
                                          </el-form-item>
                                        </el-col>
                                        <el-col :span="5">
                                          <el-form-item prop="'remark' + index">
                                            <el-input
                                              type="text"
                                              v-model="item6.remark"
                                              autocomplete="off"
                                              maxlength="50"
                                              placeholder="备注"
                                            />
                                          </el-form-item>
                                        </el-col>
                                        <el-col :span="4">
                                          <el-button
                                            type="success"
                                            :icon="Plus"
                                            circle
                                            @click="addReturnConfig6(item5)"
                                          />
                                          <el-button
                                            type="danger"
                                            :icon="Delete"
                                            circle
                                            @click.prevent="removeReturnConfig6(item6, item5)"
                                          />
                                        </el-col>
                                        <el-from
                                          v-if="
                                            item6.format.includes('object') ||
                                            item6.format.includes('array') ||
                                            item6.format.includes('any')
                                          "
                                          :model="item6"
                                          :gutter="20"
                                          status-icon
                                          label-width="100px"
                                          class="ml-8"
                                        >
                                          <el-row :gutter="20" v-for="item7 in item6.node" :key="item7.name">
                                            <el-col :span="4">
                                              <el-form-item prop="'name' + index">
                                                <el-input
                                                  type="text"
                                                  v-model="item7.name"
                                                  autocomplete="off"
                                                  maxlength="50"
                                                  placeholder="节点"
                                                />
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="3">
                                              <el-form-item prop="'is_have' + index">
                                                <el-select
                                                  v-model="item7.is_have"
                                                  autocomplete="off"
                                                  placeholder="必需"
                                                >
                                                  <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                                  />
                                                </el-select>
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="3">
                                              <el-form-item prop="'format' + index">
                                                <el-select
                                                  v-model="item7.format"
                                                  autocomplete="off"
                                                  placeholder="string"
                                                >
                                                  <el-option
                                                    v-for="item in options_2"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                                  />
                                                </el-select>
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="5">
                                              <el-form-item prop="'http_dome' + index">
                                                <el-input
                                                  type="text"
                                                  v-model="item7.http_dome"
                                                  autocomplete="off"
                                                  maxlength="50"
                                                  placeholder="中文名"
                                                />
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="5">
                                              <el-form-item prop="'remark' + index">
                                                <el-input
                                                  type="text"
                                                  v-model="item7.remark"
                                                  autocomplete="off"
                                                  maxlength="50"
                                                  placeholder="备注"
                                                />
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="4">
                                              <el-button
                                                type="success"
                                                :icon="Plus"
                                                circle
                                                @click="addReturnConfig7(item6)"
                                              />
                                              <el-button
                                                type="danger"
                                                :icon="Delete"
                                                circle
                                                @click.prevent="removeReturnConfig7(item7, item6)"
                                              />
                                            </el-col>
                                            <el-from
                                              v-if="
                                                item7.format.includes('object') ||
                                                item7.format.includes('array') ||
                                                item7.format.includes('any')
                                              "
                                              :model="item7"
                                              :gutter="20"
                                              status-icon
                                              label-width="100px"
                                              class="ml-8"
                                            >
                                              <el-row :gutter="20" v-for="item8 in item7.node" :key="item8.name">
                                                <el-col :span="4">
                                                  <el-form-item prop="'name' + index">
                                                    <el-input
                                                      type="text"
                                                      v-model="item8.name"
                                                      autocomplete="off"
                                                      maxlength="50"
                                                      placeholder="节点"
                                                    />
                                                  </el-form-item>
                                                </el-col>
                                                <el-col :span="3">
                                                  <el-form-item prop="'is_have' + index">
                                                    <el-select
                                                      v-model="item8.is_have"
                                                      autocomplete="off"
                                                      placeholder="必需"
                                                    >
                                                      <el-option
                                                        v-for="item in options"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                      />
                                                    </el-select>
                                                  </el-form-item>
                                                </el-col>
                                                <el-col :span="3">
                                                  <el-form-item prop="'format' + index">
                                                    <el-select
                                                      v-model="item8.format"
                                                      autocomplete="off"
                                                      placeholder="string"
                                                    >
                                                      <el-option
                                                        v-for="item in options_2"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                      />
                                                    </el-select>
                                                  </el-form-item>
                                                </el-col>
                                                <el-col :span="5">
                                                  <el-form-item prop="'http_dome' + index">
                                                    <el-input
                                                      type="text"
                                                      v-model="item8.http_dome"
                                                      autocomplete="off"
                                                      maxlength="50"
                                                      placeholder="中文名"
                                                    />
                                                  </el-form-item>
                                                </el-col>
                                                <el-col :span="5">
                                                  <el-form-item prop="'remark' + index">
                                                    <el-input
                                                      type="text"
                                                      v-model="item8.remark"
                                                      autocomplete="off"
                                                      maxlength="50"
                                                      placeholder="备注"
                                                    />
                                                  </el-form-item>
                                                </el-col>
                                                <el-col :span="4">
                                                  <el-button
                                                    type="success"
                                                    :icon="Plus"
                                                    circle
                                                    @click="addReturnConfig8(item7)"
                                                  />
                                                  <el-button
                                                    type="danger"
                                                    :icon="Delete"
                                                    circle
                                                    @click.prevent="removeReturnConfig8(item8, item7)"
                                                  />
                                                </el-col>
                                                <el-from
                                                  v-if="
                                                    item8.format.includes('object') ||
                                                    item8.format.includes('array') ||
                                                    item8.format.includes('any')
                                                  "
                                                  :model="item8"
                                                  :gutter="20"
                                                  status-icon
                                                  label-width="100px"
                                                  class="ml-8"
                                                >
                                                  <el-row :gutter="20" v-for="item9 in item8.node" :key="item9.name">
                                                    <el-col :span="4">
                                                      <el-form-item prop="'name' + index">
                                                        <el-input
                                                          type="text"
                                                          v-model="item9.name"
                                                          autocomplete="off"
                                                          maxlength="50"
                                                          placeholder="节点"
                                                        />
                                                      </el-form-item>
                                                    </el-col>
                                                    <el-col :span="3">
                                                      <el-form-item prop="'is_have' + index">
                                                        <el-select
                                                          v-model="item9.is_have"
                                                          autocomplete="off"
                                                          placeholder="必需"
                                                        >
                                                          <el-option
                                                            v-for="item in options"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value"
                                                          />
                                                        </el-select>
                                                      </el-form-item>
                                                    </el-col>
                                                    <el-col :span="3">
                                                      <el-form-item prop="'format' + index">
                                                        <el-select
                                                          v-model="item9.format"
                                                          autocomplete="off"
                                                          placeholder="string"
                                                        >
                                                          <el-option
                                                            v-for="item in options_2"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value"
                                                          />
                                                        </el-select>
                                                      </el-form-item>
                                                    </el-col>
                                                    <el-col :span="5">
                                                      <el-form-item prop="'http_dome' + index">
                                                        <el-input
                                                          type="text"
                                                          v-model="item9.http_dome"
                                                          autocomplete="off"
                                                          maxlength="50"
                                                          placeholder="中文名"
                                                        />
                                                      </el-form-item>
                                                    </el-col>
                                                    <el-col :span="5">
                                                      <el-form-item prop="'remark' + index">
                                                        <el-input
                                                          type="text"
                                                          v-model="item9.remark"
                                                          autocomplete="off"
                                                          maxlength="50"
                                                          placeholder="备注"
                                                        />
                                                      </el-form-item>
                                                    </el-col>
                                                    <el-col :span="4">
                                                      <el-button
                                                        type="success"
                                                        :icon="Plus"
                                                        circle
                                                        @click="addReturnConfig9(item8)"
                                                      />
                                                      <el-button
                                                        type="danger"
                                                        :icon="Delete"
                                                        circle
                                                        @click.prevent="removeReturnConfig9(item9, item8)"
                                                      />
                                                    </el-col>
                                                    <el-from
                                                      v-if="
                                                        item9.format.includes('object') ||
                                                        item9.format.includes('array') ||
                                                        item9.format.includes('any')
                                                      "
                                                      :model="item9"
                                                      :gutter="20"
                                                      status-icon
                                                      label-width="100px"
                                                      class="ml-8"
                                                    >
                                                      <el-row
                                                        :gutter="20"
                                                        v-for="item10 in item9.node"
                                                        :key="item10.name"
                                                      >
                                                        <el-col :span="4">
                                                          <el-form-item prop="'name' + index">
                                                            <el-input
                                                              type="text"
                                                              v-model="item10.name"
                                                              autocomplete="off"
                                                              maxlength="50"
                                                              placeholder="节点"
                                                            />
                                                          </el-form-item>
                                                        </el-col>
                                                        <el-col :span="3">
                                                          <el-form-item prop="'is_have' + index">
                                                            <el-select
                                                              v-model="item10.is_have"
                                                              autocomplete="off"
                                                              placeholder="必需"
                                                            >
                                                              <el-option
                                                                v-for="item in options"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value"
                                                              />
                                                            </el-select>
                                                          </el-form-item>
                                                        </el-col>
                                                        <el-col :span="3">
                                                          <el-form-item prop="'format' + index">
                                                            <el-select
                                                              v-model="item10.format"
                                                              autocomplete="off"
                                                              placeholder="string"
                                                            >
                                                              <el-option
                                                                v-for="item in options_2"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value"
                                                              />
                                                            </el-select>
                                                          </el-form-item>
                                                        </el-col>
                                                        <el-col :span="5">
                                                          <el-form-item prop="'http_dome' + index">
                                                            <el-input
                                                              type="text"
                                                              v-model="item10.http_dome"
                                                              autocomplete="off"
                                                              maxlength="50"
                                                              placeholder="中文名"
                                                            />
                                                          </el-form-item>
                                                        </el-col>
                                                        <el-col :span="5">
                                                          <el-form-item prop="'remark' + index">
                                                            <el-input
                                                              type="text"
                                                              v-model="item10.remark"
                                                              autocomplete="off"
                                                              maxlength="50"
                                                              placeholder="备注"
                                                            />
                                                          </el-form-item>
                                                        </el-col>
                                                        <el-col :span="4">
                                                          <el-button
                                                            type="success"
                                                            :icon="Plus"
                                                            circle
                                                            @click="addReturnConfig10(item9)"
                                                          />
                                                          <el-button
                                                            type="danger"
                                                            :icon="Delete"
                                                            circle
                                                            @click.prevent="removeReturnConfig10(item10, item9)"
                                                          /> </el-col></el-row></el-from></el-row></el-from></el-row></el-from></el-row></el-from></el-row></el-from></el-row></el-from></el-row></el-from></el-row></el-from></el-row></el-from></el-row
                ></el-from>
              </el-row> </el-form
          ></el-descriptions-item>
        </el-descriptions>

        <el-descriptions v-if="!flag && isShow === 2" size="large" :border="true">
          <el-descriptions-item label="预览"><el-input v-model="v_input" /></el-descriptions-item>
        </el-descriptions>

        <el-divider />
        <div v-if="isShow != 2" class="windi-flex-center">
          <el-button type="warning" @click="clear_1">清空(参数信息))</el-button>
          <el-button type="primary" @click="save">保 存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="运行" name="second">
        <el-divider />
        <div class="mt-4">
          <el-input v-model="urlRunConfig" disabled prefix placeholder="/" class="input-with-select">
            <template #prepend>
              <el-select v-model="methodRun" disabled placeholder="Method" style="width: 220px" />
            </template>
            <template #append>
              <el-select v-model="RunData" disabled placeholder="Method" style="width: 1020px" />
            </template>
          </el-input>
        </div>
        <el-divider />
        <div>
          <el-radio-group v-model="radio1" size="large" @change="setFlag1">
            <el-radio-button label="Headers" />
            <el-radio-button label="Cookies" />
            <el-radio-button label="Params" />
            <el-radio-button label="Body" />
            <div v-if="paramFlag + bodyFlag > 2" class="ml-65vw">
              <el-tag
                v-for="item in items"
                size="large"
                :key="item.label"
                :type="item.type"
                class="mx-1"
                effect="dark"
                round
              >
                {{ item.label }}
              </el-tag>
            </div>
            <div v-else-if="paramFlag + bodyFlag === 2" class="ml-65vw">
              <el-tag
                v-for="item in items1"
                size="large"
                :key="item.label"
                :type="item.type"
                class="mx-1"
                effect="dark"
                round
              >
                {{ item.label }}
              </el-tag>
            </div>
            <div v-else-if="paramFlag + bodyFlag === 1" class="ml-65vw">
              <el-tag
                v-for="item in items"
                size="large"
                :key="item.label"
                :type="item.type"
                class="mx-1"
                effect="dark"
                round
              >
                {{ item.label }}
              </el-tag>
            </div>
          </el-radio-group>
        </div>
        <el-form
          v-if="flag_1 === 1"
          :model="ruleForm_3"
          status-icon
          ref="formRef_4"
          label-width="100px"
          style="margin-top: 20px"
          @click="setHeaders"
        >
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item>参数名 (Headers) </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item> 类型 (Headers) </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item> 参数值 (Headers) </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item> 说明 (Headers) </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-button type="success" :icon="Plus" circle @click="addHeadersConfig" />
            </el-col>
          </el-row>
          <el-row :gutter="20" v-for="(item, index) in ruleForm_3.HeadersConfig" :key="index">
            <el-col :span="4">
              <el-form-item prop="'name' + index">
                <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" placeholder="添加参数" />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="'format' + index">
                <el-select v-model="item.format" autocomplete="off" placeholder="string">
                  <el-option v-for="item in options_1" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="'value' + index">
                <el-input type="text" v-model="item.value" autocomplete="off" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item prop="'remark' + index">
                <el-input type="text" v-model="item.remark" autocomplete="off" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="danger" :icon="Delete" circle @click.prevent="removeHeadersConfig(item)" />
            </el-col>
          </el-row>
        </el-form>
        <el-form
          v-if="flag_1 === 2"
          :model="ruleForm_4"
          status-icon
          ref="formRef_5"
          label-width="100px"
          style="margin-top: 20px"
          @click="setCookies"
        >
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item>参数名 (Cookies) </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item> 类型 (Cookies) </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item> 参数值 (Cookies) </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item> 说明 (Cookies) </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-button type="success" :icon="Plus" circle @click="addCookiesConfig" />
            </el-col>
          </el-row>
          <el-row :gutter="20" v-for="(item, index) in ruleForm_4.CookiesConfig" :key="index">
            <el-col :span="4">
              <el-form-item prop="'name' + index">
                <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" placeholder="添加参数" />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="'format' + index">
                <el-select v-model="item.format" autocomplete="off" placeholder="string">
                  <el-option v-for="item in options_1" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="'value' + index">
                <el-input type="text" v-model="item.value" autocomplete="off" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item prop="'remark' + index">
                <el-input type="text" v-model="item.remark" autocomplete="off" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="danger" :icon="Delete" circle @click.prevent="removeCookiesConfig(item)" />
            </el-col>
          </el-row>
        </el-form>
        <el-form
          v-if="flag_1 === 3"
          :model="ruleForm_5"
          status-icon
          ref="formRef_6"
          label-width="100px"
          style="margin-top: 20px"
          @click="checkParams"
        >
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item>参数名 (Params) </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item> 类型 (Params) </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item> 参数值 (Params) </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item> 说明 (Params) </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-button type="success" :icon="Plus" circle @click="addParamsConfig" />
            </el-col>
          </el-row>
          <el-row :gutter="20" v-for="(item, index) in ruleForm_5.ParamsConfig" :key="index">
            <el-col :span="4">
              <el-form-item prop="'name' + index">
                <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" placeholder="添加参数" />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="'format' + index">
                <el-select v-model="item.format" autocomplete="off" placeholder="string">
                  <el-option v-for="item in options_1" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="'value' + index">
                <el-input type="text" v-model="item.value" autocomplete="off" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item prop="'remark' + index">
                <el-input type="text" v-model="item.remark" autocomplete="off" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="danger" :icon="Delete" circle @click.prevent="removeParamsConfig(item)" />
            </el-col>
          </el-row>
        </el-form>
        <el-form
          v-if="flag_1 === 4"
          :model="ruleForm_6"
          status-icon
          ref="formRef_7"
          label-width="100px"
          style="margin-top: 20px"
          @click="checkBody"
        >
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item>参数名 (Body) </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item> 类型 (Body) </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item> 参数值 (Body) </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item> 说明 (Body) </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-button type="success" :icon="Plus" circle @click="addBody1Config" />
            </el-col>
          </el-row>
          <el-row :gutter="20" v-for="(item, index) in ruleForm_6.BodyConfig" :key="index">
            <el-col :span="4">
              <el-form-item prop="'name' + index">
                <el-input type="text" v-model="item.name" autocomplete="off" maxlength="50" placeholder="添加参数" />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="'format' + index">
                <el-select v-model="item.format" autocomplete="off" placeholder="string">
                  <el-option v-for="item in options_1" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="'value' + index">
                <el-input type="text" v-model="item.value" autocomplete="off" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item prop="'remark' + index">
                <el-input type="text" v-model="item.remark" autocomplete="off" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="danger" :icon="Delete" circle @click.prevent="removeBody1Config(item)" />
            </el-col>
          </el-row>
        </el-form>
        <el-divider />
        <el-card class="box-card" shadow="never">
          <template #header>
            <div class="card-header">
              <span style="font-size: large">Response (预览HTML)</span>
            </div>
          </template>
          <el-descriptions>
            <el-descriptions-item label="Body">
              <textarea rows="19" disabled style="width: 100%; resize: vertical" v-model="ResponseBody" />
            </el-descriptions-item>
            <el-descriptions-item label="Headers">
              <textarea rows="19" disabled style="width: 100%; resize: vertical" v-model="ResponseHeaders" />
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-divider />
        <el-button @click="clear">重置</el-button>
        <el-button type="warning" @click="sendData">发送</el-button>
      </el-tab-pane>
      <el-tab-pane label="Mock(高级)" name="third"
        ><el-descriptions title="接口参数信息" :column="2">
          <el-descriptions-item label="Headers">
            <textarea rows="15" disabled style="width: 100%; resize: vertical" v-model="ResponseHeaders" />
          </el-descriptions-item>
          <el-descriptions-item label="Cookies">
            <textarea rows="15" disabled style="width: 100%; resize: vertical" v-model="ResponseCookies" />
          </el-descriptions-item>
          <el-descriptions-item label="body">
            <textarea rows="15" disabled style="width: 100%; resize: vertical" v-model="ResponseBody1" />
          </el-descriptions-item>
          <el-descriptions-item label="query">
            <textarea rows="15" disabled style="width: 100%; resize: vertical" v-model="ResponseParams" />
          </el-descriptions-item>
        </el-descriptions>
        <el-divider />
        <el-descriptions title="Mock服务" :column="1">
          <el-descriptions-item label="Mock地址:">{{ mockUrl }}</el-descriptions-item>
        </el-descriptions> </el-tab-pane
      ><el-tab-pane label="预览" name="fourth"
        ><el-descriptions size="large" :border="true" title="基本信息">
          <el-descriptions-item label="接口名称:">{{ formData.name }}</el-descriptions-item
          ><el-descriptions-item label="接口路径:">{{ formData.url }}</el-descriptions-item
          ><el-descriptions-item label="请求方法:">{{ formData.method }}</el-descriptions-item
          ><el-descriptions-item label="状态:">
            <el-tag size="small">开发中</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="最近更新成员ID:">{{ update_by }}</el-descriptions-item>
          <el-descriptions-item label="最近更新时间:">{{ update_time }}</el-descriptions-item>
        </el-descriptions>
        <el-divider />
        <el-descriptions size="large" :border="true" title="Mock服务">
          <el-descriptions-item label="Mock地址:">{{ mockUrl }}</el-descriptions-item>
        </el-descriptions>
        <el-divider />
        <el-descriptions size="large" :border="true" title="返回数据">
          <el-descriptions-item>
            <div style="white-space: pre-line" class="bg-gray-50">
              <pre>{{ ResponseReturn1 }}</pre>
            </div>
            <textarea type="text" disabled rows="13" style="width: 100%; resize: vertical" v-model="ResponseReturn" />
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
    </el-tabs>

    <InterfaceDevelopment1 ref="InterfaceDevelopmentRef1" />
  </el-dialog>
</template>

<script setup lang="ts">
import { FormRules, ElInput, FormInstance, ElMessage, TabsPaneContext, TagProps } from "element-plus"
import { reactive, ref, toRefs } from "vue"
import { updateInterfaceDataApi, MockInterfaceDetailApi, getTableDataApi } from "@/api/table/index"
import { CreateInterfaceRequestData } from "@/api/table/types/table"
import { useProjectStore } from "@/store/modules/personal-space"
import { useUserStore } from "@/store/modules/user"
import { getInterfaceDetailApi } from "@/api/table/index"
import { Delete, Plus, RefreshRight } from "@element-plus/icons-vue"
import { toJSONString } from "xe-utils"
// import { getSelectDataApi } from "@/api/hook-demo/use-fetch-select"
import InterfaceDevelopment1 from "./interface-development1.vue"
import axios from "axios"
// import { getToken } from "@/utils/cache/cookies"

const InterfaceDevelopmentRef1 = ref<InstanceType<typeof InterfaceDevelopment1>>()

type Item = { type: TagProps["type"]; label: string }

const items = ref<Array<Item>>([{ type: "warning", label: "! 参数/类型不一致" }])

const items1 = ref<Array<Item>>([{ type: "success", label: "参数/类型一致" }])

// 参数声明
const formRef_1 = ref(null)
const state = reactive({
  ruleForm: {
    QueryConfig: [
      {
        name: "",
        is_have: "",
        format: "",
        dome: "",
        remark: ""
      }
    ]
  }
})

const addQueryConfig = () => {
  state.ruleForm.QueryConfig.push({
    name: "",
    is_have: "",
    format: "",
    dome: "",
    remark: ""
  })
}

const removeQueryConfig = (item: any) => {
  const index = state.ruleForm.QueryConfig.indexOf(item)
  if (index !== -1) {
    state.ruleForm.QueryConfig.splice(index, 1)
  }
}

// 数据解构
const { ruleForm } = {
  ...toRefs(state)
}

const formRef_2 = ref(null)
const state_1 = reactive({
  ruleForm_1: {
    BodyConfig: [
      {
        name: "",
        is_have: "",
        format: "",
        dome: "",
        remark: ""
      }
    ]
  }
})

const addBodyConfig = () => {
  state_1.ruleForm_1.BodyConfig.push({
    name: "",
    is_have: "",
    format: "",
    dome: "",
    remark: ""
  })
}

const removeBodyConfig = (item: any) => {
  const index = state_1.ruleForm_1.BodyConfig.indexOf(item)
  if (index !== -1) {
    state_1.ruleForm_1.BodyConfig.splice(index, 1)
  }
}

// 数据解构
const { ruleForm_1 } = {
  ...toRefs(state_1)
}

const formRef_3 = ref(null)
const state_2 = reactive({
  ruleForm_2: {
    returnConfig: [
      {
        name: "",
        is_have: "",
        format: "",
        http_dome: "",
        remark: "",
        node: [
          {
            name: "",
            is_have: "",
            format: "",
            http_dome: "",
            remark: "",
            node: [
              {
                name: "",
                is_have: "",
                format: "",
                http_dome: "",
                remark: "",
                node: [
                  {
                    name: "",
                    is_have: "",
                    format: "",
                    http_dome: "",
                    remark: "",
                    node: [
                      {
                        name: "",
                        is_have: "",
                        format: "",
                        http_dome: "",
                        remark: "",
                        node: [
                          {
                            name: "",
                            is_have: "",
                            format: "",
                            http_dome: "",
                            remark: "",
                            node: [
                              {
                                name: "",
                                is_have: "",
                                format: "",
                                http_dome: "",
                                remark: "",
                                node: [
                                  {
                                    name: "",
                                    is_have: "",
                                    format: "",
                                    http_dome: "",
                                    remark: "",
                                    node: [
                                      {
                                        name: "",
                                        is_have: "",
                                        format: "",
                                        http_dome: "",
                                        remark: "",
                                        node: [
                                          {
                                            name: "",
                                            is_have: "",
                                            format: "",
                                            http_dome: "",
                                            remark: "",
                                            node: [
                                              {
                                                name: "",
                                                is_have: "",
                                                format: "",
                                                http_dome: "",
                                                remark: "",
                                                node: []
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
})

const addReturnConfig = () => {
  state_2.ruleForm_2.returnConfig.push({
    name: "",
    is_have: "",
    format: "",
    http_dome: "",
    remark: "",
    node: [
      {
        name: "",
        is_have: "",
        format: "",
        http_dome: "",
        remark: "",
        node: [
          {
            name: "",
            is_have: "",
            format: "",
            http_dome: "",
            remark: "",
            node: [
              {
                name: "",
                is_have: "",
                format: "",
                http_dome: "",
                remark: "",
                node: [
                  {
                    name: "",
                    is_have: "",
                    format: "",
                    http_dome: "",
                    remark: "",
                    node: [
                      {
                        name: "",
                        is_have: "",
                        format: "",
                        http_dome: "",
                        remark: "",
                        node: [
                          {
                            name: "",
                            is_have: "",
                            format: "",
                            http_dome: "",
                            remark: "",
                            node: [
                              {
                                name: "",
                                is_have: "",
                                format: "",
                                http_dome: "",
                                remark: "",
                                node: [
                                  {
                                    name: "",
                                    is_have: "",
                                    format: "",
                                    http_dome: "",
                                    remark: "",
                                    node: [
                                      {
                                        name: "",
                                        is_have: "",
                                        format: "",
                                        http_dome: "",
                                        remark: "",
                                        node: [
                                          {
                                            name: "",
                                            is_have: "",
                                            format: "",
                                            http_dome: "",
                                            remark: "",
                                            node: []
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  })
}

const addReturnConfig1 = (item: any) => {
  item.node.push({
    name: "",
    is_have: "",
    format: "",
    http_dome: "",
    remark: "",
    node: [
      {
        name: "",
        is_have: "",
        format: "",
        http_dome: "",
        remark: "",
        node: [
          {
            name: "",
            is_have: "",
            format: "",
            http_dome: "",
            remark: "",
            node: [
              {
                name: "",
                is_have: "",
                format: "",
                http_dome: "",
                remark: "",
                node: [
                  {
                    name: "",
                    is_have: "",
                    format: "",
                    http_dome: "",
                    remark: "",
                    node: [
                      {
                        name: "",
                        is_have: "",
                        format: "",
                        http_dome: "",
                        remark: "",
                        node: [
                          {
                            name: "",
                            is_have: "",
                            format: "",
                            http_dome: "",
                            remark: "",
                            node: [
                              {
                                name: "",
                                is_have: "",
                                format: "",
                                http_dome: "",
                                remark: "",
                                node: [
                                  {
                                    name: "",
                                    is_have: "",
                                    format: "",
                                    http_dome: "",
                                    remark: "",
                                    node: [
                                      {
                                        name: "",
                                        is_have: "",
                                        format: "",
                                        http_dome: "",
                                        remark: "",
                                        node: []
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  })
}

const addReturnConfig2 = (item: any) => {
  item.node.push({
    name: "",
    is_have: "",
    format: "",
    http_dome: "",
    remark: "",
    node: [
      {
        name: "",
        is_have: "",
        format: "",
        http_dome: "",
        remark: "",
        node: [
          {
            name: "",
            is_have: "",
            format: "",
            http_dome: "",
            remark: "",
            node: [
              {
                name: "",
                is_have: "",
                format: "",
                http_dome: "",
                remark: "",
                node: [
                  {
                    name: "",
                    is_have: "",
                    format: "",
                    http_dome: "",
                    remark: "",
                    node: [
                      {
                        name: "",
                        is_have: "",
                        format: "",
                        http_dome: "",
                        remark: "",
                        node: [
                          {
                            name: "",
                            is_have: "",
                            format: "",
                            http_dome: "",
                            remark: "",
                            node: [
                              {
                                name: "",
                                is_have: "",
                                format: "",
                                http_dome: "",
                                remark: "",
                                node: [
                                  {
                                    name: "",
                                    is_have: "",
                                    format: "",
                                    http_dome: "",
                                    remark: "",
                                    node: []
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  })
}

const addReturnConfig3 = (item: any) => {
  item.node.push({
    name: "",
    is_have: "",
    format: "",
    http_dome: "",
    remark: "",
    node: [
      {
        name: "",
        is_have: "",
        format: "",
        http_dome: "",
        remark: "",
        node: [
          {
            name: "",
            is_have: "",
            format: "",
            http_dome: "",
            remark: "",
            node: [
              {
                name: "",
                is_have: "",
                format: "",
                http_dome: "",
                remark: "",
                node: [
                  {
                    name: "",
                    is_have: "",
                    format: "",
                    http_dome: "",
                    remark: "",
                    node: [
                      {
                        name: "",
                        is_have: "",
                        format: "",
                        http_dome: "",
                        remark: "",
                        node: [
                          {
                            name: "",
                            is_have: "",
                            format: "",
                            http_dome: "",
                            remark: "",
                            node: [
                              {
                                name: "",
                                is_have: "",
                                format: "",
                                http_dome: "",
                                remark: "",
                                node: []
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  })
}

const addReturnConfig4 = (item: any) => {
  item.node.push({
    name: "",
    is_have: "",
    format: "",
    http_dome: "",
    remark: "",
    node: [
      {
        name: "",
        is_have: "",
        format: "",
        http_dome: "",
        remark: "",
        node: [
          {
            name: "",
            is_have: "",
            format: "",
            http_dome: "",
            remark: "",
            node: [
              {
                name: "",
                is_have: "",
                format: "",
                http_dome: "",
                remark: "",
                node: [
                  {
                    name: "",
                    is_have: "",
                    format: "",
                    http_dome: "",
                    remark: "",
                    node: [
                      {
                        name: "",
                        is_have: "",
                        format: "",
                        http_dome: "",
                        remark: "",
                        node: [
                          {
                            name: "",
                            is_have: "",
                            format: "",
                            http_dome: "",
                            remark: "",
                            node: []
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  })
}

const addReturnConfig5 = (item: any) => {
  item.node.push({
    name: "",
    is_have: "",
    format: "",
    http_dome: "",
    remark: "",
    node: [
      {
        name: "",
        is_have: "",
        format: "",
        http_dome: "",
        remark: "",
        node: [
          {
            name: "",
            is_have: "",
            format: "",
            http_dome: "",
            remark: "",
            node: [
              {
                name: "",
                is_have: "",
                format: "",
                http_dome: "",
                remark: "",
                node: [
                  {
                    name: "",
                    is_have: "",
                    format: "",
                    http_dome: "",
                    remark: "",
                    node: [
                      {
                        name: "",
                        is_have: "",
                        format: "",
                        http_dome: "",
                        remark: "",
                        node: []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  })
}

const addReturnConfig6 = (item: any) => {
  item.node.push({
    name: "",
    is_have: "",
    format: "",
    http_dome: "",
    remark: "",
    node: [
      {
        name: "",
        is_have: "",
        format: "",
        http_dome: "",
        remark: "",
        node: [
          {
            name: "",
            is_have: "",
            format: "",
            http_dome: "",
            remark: "",
            node: [
              {
                name: "",
                is_have: "",
                format: "",
                http_dome: "",
                remark: "",
                node: [
                  {
                    name: "",
                    is_have: "",
                    format: "",
                    http_dome: "",
                    remark: "",
                    node: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  })
}

const addReturnConfig7 = (item: any) => {
  item.node.push({
    name: "",
    is_have: "",
    format: "",
    http_dome: "",
    remark: "",
    node: [
      {
        name: "",
        is_have: "",
        format: "",
        http_dome: "",
        remark: "",
        node: [
          {
            name: "",
            is_have: "",
            format: "",
            http_dome: "",
            remark: "",
            node: [
              {
                name: "",
                is_have: "",
                format: "",
                http_dome: "",
                remark: "",
                node: []
              }
            ]
          }
        ]
      }
    ]
  })
}

const addReturnConfig8 = (item: any) => {
  item.node.push({
    name: "",
    is_have: "",
    format: "",
    http_dome: "",
    remark: "",
    node: [
      {
        name: "",
        is_have: "",
        format: "",
        http_dome: "",
        remark: "",
        node: [
          {
            name: "",
            is_have: "",
            format: "",
            http_dome: "",
            remark: "",
            node: []
          }
        ]
      }
    ]
  })
}

const addReturnConfig9 = (item: any) => {
  item.node.push({
    name: "",
    is_have: "",
    format: "",
    http_dome: "",
    remark: "",
    node: [
      {
        name: "",
        is_have: "",
        format: "",
        http_dome: "",
        remark: "",
        node: []
      }
    ]
  })
}

const addReturnConfig10 = (item: any) => {
  item.node.push({
    name: "",
    is_have: "",
    format: "",
    http_dome: "",
    remark: "",
    node: []
  })
}

const removeReturnConfig = (item: any) => {
  const index = state_2.ruleForm_2.returnConfig.indexOf(item)
  if (index !== -1) {
    state_2.ruleForm_2.returnConfig.splice(index, 1)
  }
}

const removeReturnConfig1 = (item: any, itemprop: any) => {
  const index = itemprop.node.indexOf(item)
  if (index !== -1) {
    itemprop.node.splice(index, 1)
  }
}
const removeReturnConfig2 = (item: any, itemprop: any) => {
  const index = itemprop.node.indexOf(item)
  if (index !== -1) {
    itemprop.node.splice(index, 1)
  }
}
const removeReturnConfig3 = (item: any, itemprop: any) => {
  const index = itemprop.node.indexOf(item)
  if (index !== -1) {
    itemprop.node.splice(index, 1)
  }
}
const removeReturnConfig4 = (item: any, itemprop: any) => {
  const index = itemprop.node.indexOf(item)
  if (index !== -1) {
    itemprop.node.splice(index, 1)
  }
}
const removeReturnConfig5 = (item: any, itemprop: any) => {
  const index = itemprop.node.indexOf(item)
  if (index !== -1) {
    itemprop.node.splice(index, 1)
  }
}
const removeReturnConfig6 = (item: any, itemprop: any) => {
  const index = itemprop.node.indexOf(item)
  if (index !== -1) {
    itemprop.node.splice(index, 1)
  }
}
const removeReturnConfig7 = (item: any, itemprop: any) => {
  const index = itemprop.node.indexOf(item)
  if (index !== -1) {
    itemprop.node.splice(index, 1)
  }
}
const removeReturnConfig8 = (item: any, itemprop: any) => {
  const index = itemprop.node.indexOf(item)
  if (index !== -1) {
    itemprop.node.splice(index, 1)
  }
}
const removeReturnConfig9 = (item: any, itemprop: any) => {
  const index = itemprop.node.indexOf(item)
  if (index !== -1) {
    itemprop.node.splice(index, 1)
  }
}
const removeReturnConfig10 = (item: any, itemprop: any) => {
  const index = itemprop.node.indexOf(item)
  if (index !== -1) {
    itemprop.node.splice(index, 1)
  }
}

// 数据解构
const { ruleForm_2 } = {
  ...toRefs(state_2)
}

const formRef_4 = ref(null)
const state_3 = reactive({
  ruleForm_3: {
    HeadersConfig: [
      {
        name: "",
        value: "",
        format: "",
        remark: ""
      }
    ]
  }
})

const addHeadersConfig = () => {
  state_3.ruleForm_3.HeadersConfig.push({
    name: "",
    value: "",
    format: "",
    remark: ""
  })
}

const removeHeadersConfig = (item: any) => {
  const index = state_3.ruleForm_3.HeadersConfig.indexOf(item)
  if (index !== -1) {
    state_3.ruleForm_3.HeadersConfig.splice(index, 1)
  }
}

// 数据解构
const { ruleForm_3 } = {
  ...toRefs(state_3)
}

const formRef_5 = ref(null)
const state_4 = reactive({
  ruleForm_4: {
    CookiesConfig: [
      {
        name: "",
        value: "",
        format: "",
        remark: ""
      }
    ]
  }
})

const addCookiesConfig = () => {
  state_4.ruleForm_4.CookiesConfig.push({
    name: "",
    value: "",
    format: "",
    remark: ""
  })
}

const removeCookiesConfig = (item: any) => {
  const index = state_4.ruleForm_4.CookiesConfig.indexOf(item)
  if (index !== -1) {
    state_4.ruleForm_4.CookiesConfig.splice(index, 1)
  }
}

// 数据解构
const { ruleForm_4 } = {
  ...toRefs(state_4)
}

const formRef_7 = ref(null)
const state_6 = reactive({
  ruleForm_6: {
    BodyConfig: [
      {
        name: "",
        value: "",
        format: "",
        remark: ""
      }
    ]
  }
})

const addBody1Config = () => {
  state_6.ruleForm_6.BodyConfig.push({
    name: "",
    value: "",
    format: "",
    remark: ""
  })
}

const removeBody1Config = (item: any) => {
  const index = state_6.ruleForm_6.BodyConfig.indexOf(item)
  if (index !== -1) {
    state_6.ruleForm_6.BodyConfig.splice(index, 1)
  }
}

// 数据解构
const { ruleForm_6 } = {
  ...toRefs(state_6)
}

const formRef_6 = ref(null)
const state_5 = reactive({
  ruleForm_5: {
    ParamsConfig: [
      {
        name: "",
        value: "",
        format: "",
        remark: ""
      }
    ]
  }
})

const addParamsConfig = () => {
  state_5.ruleForm_5.ParamsConfig.push({
    name: "",
    value: "",
    format: "",
    remark: ""
  })
}

const removeParamsConfig = (item: any) => {
  const index = state_5.ruleForm_5.ParamsConfig.indexOf(item)
  if (index !== -1) {
    state_5.ruleForm_5.ParamsConfig.splice(index, 1)
  }
}

// 数据解构
const { ruleForm_5 } = {
  ...toRefs(state_5)
}

const projectStore = useProjectStore()

const options = [
  {
    value: "必需",
    label: "必需"
  },
  {
    value: "非必需",
    label: "非必需"
  }
]

const options_1 = [
  {
    value: "string",
    label: "string"
  },
  {
    value: "number",
    label: "number"
  },
  {
    value: "array",
    label: "array"
  },
  {
    value: "integer",
    label: "integer"
  }
]

const options_2 = [
  {
    value: "string",
    label: "string"
  },
  {
    value: "integer",
    label: "integer"
  },
  {
    value: "boolean",
    label: "boolean"
  },
  {
    value: "array",
    label: "array"
  },
  {
    value: "object",
    label: "object"
  },
  {
    value: "number",
    label: "number"
  },
  {
    value: "null",
    label: "null"
  },
  {
    value: "any",
    label: "any"
  }
]

const flag = ref<boolean>(true)
const flag_1 = ref<number>(4)
const activeName = ref("first")
const radio = ref(3)
const radio1 = ref("Body")
const setFlag = () => {
  if (radio.value === 3 || radio.value === 6) flag.value = true
  else flag.value = false
}
const setFlag1 = () => {
  if (radio1.value === "Headers") flag_1.value = 1
  else if (radio1.value === "Cookies") flag_1.value = 2
  else if (radio1.value === "Params") flag_1.value = 3
  else flag_1.value = 4
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

interface DetailMsg {
  projectId: string
  name: string
  url: string
  http_method: "GET" | "POST" | "PUT" | "DELETE"
  query: object
  body: object
  response_data: object
  __v: number | null
  _id: string
}

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()
const emit = defineEmits(["initData"])
const methodRun = ref("")
const urlRunConfig = ref("")
const RunData = ref("/")
const mockUrl = ref<string>("")
const formData = ref<CreateInterfaceRequestData>({
  projectId: projectStore.projectId,
  name: "",
  url: "",
  method: "GET",
  query: [],
  body: [],
  responseData: []
})
const titleName = ref("")
const interfaceId = ref("") //接口id
const interfaceName = ref("") //接口name
const update_by = ref<string>()
const update_time = ref<String>()
const v_input = ref<string>()
const mockMethod = ref<string>("")

// 规则
const rules = reactive<FormRules>({
  name: [{ required: true, message: "接口名称不能为空！", trigger: "change" }],
  url: [{ required: true, message: "接口地址不能为空！", trigger: "change" }],
  method: [{ required: true, message: "请求方法不能为空！", trigger: "change" }]
})

const flag_10 = ref<boolean>(true)
// 显示弹窗
const show = async (obj: { id?: number; title: string; detailMsg?: DetailMsg }) => {
  titleName.value = obj.title
  if (obj.detailMsg) {
    interfaceId.value = obj.detailMsg._id
    interfaceName.value = obj.detailMsg.name
    formData.value.projectId = obj.detailMsg.projectId
    formData.value.name = obj.detailMsg.name
    formData.value.url = obj.detailMsg.url
    urlRunConfig.value = "local: http://" + obj.detailMsg.url
    formData.value.method = obj.detailMsg.http_method
    mockMethod.value = obj.detailMsg.http_method
    if (formData.value.method === "GET") flag_10.value = false
    else flag_10.value = true
    methodRun.value = obj.detailMsg.http_method
    formData.value.query = obj.detailMsg.query
    formData.value.body = obj.detailMsg.body
    formData.value.responseData = obj.detailMsg.response_data
  } else {
    formData.value.name = ""
    formData.value.url = ""
    formData.value.method = "GET"
    formData.value.query = {}
    formData.value.body = {}
    formData.value.responseData = {}
  }
  dialogVisible.value = true
  getInterfaceDetailApiFun(interfaceId.value)
  // mockConfig()
  searchTeam()
}

const userStore = useUserStore()
const isShow = ref<number>(0)
const searchTeam = () => {
  const params = {
    projectId: projectStore.projectId
  }
  getTableDataApi(params).then((res: any) => {
    if (res.code === 200) {
      for (let i = 0; i < res.data.project.members.length; i++) {
        if (userStore.userId === res.data.project.members[i].member) {
          isShow.value = res.data.project.members[i].permission
        }
      }
    }
  })
}

const clear = () => {
  state_4.ruleForm_4.CookiesConfig = [
    {
      name: "",
      value: "",
      format: "",
      remark: ""
    }
  ]
  state_3.ruleForm_3.HeadersConfig = [
    {
      name: "",
      value: "",
      format: "",
      remark: ""
    }
  ]
  state_5.ruleForm_5.ParamsConfig = [
    {
      name: "",
      value: "",
      format: "",
      remark: ""
    }
  ]
  state_6.ruleForm_6.BodyConfig = [
    {
      name: "",
      value: "",
      format: "",
      remark: ""
    }
  ]
  ResponseBody.value = "{}"
  ResponseHeaders.value = "{}"
}
const derailment = ref<string>("")
const ResponseHeaders = ref<string>("{}")
const ResponseBody = ref<string>("{}")
const ResponseCookies = ref<string>("{}")
const ResponseParams = ref<string>("{}")
const ResponseBody1 = ref<string>("{}")
const ResponseReturn = ref<string>("{}")
const ResponseReturn1 = ref<object>({})

const clear_1 = () => {
  state_2.ruleForm_2.returnConfig = [
    {
      name: "",
      is_have: "",
      format: "",
      http_dome: "",
      remark: "",
      node: [
        {
          name: "",
          is_have: "",
          format: "",
          http_dome: "",
          remark: "",
          node: [
            {
              name: "",
              is_have: "",
              format: "",
              http_dome: "",
              remark: "",
              node: [
                {
                  name: "",
                  is_have: "",
                  format: "",
                  http_dome: "",
                  remark: "",
                  node: [
                    {
                      name: "",
                      is_have: "",
                      format: "",
                      http_dome: "",
                      remark: "",
                      node: [
                        {
                          name: "",
                          is_have: "",
                          format: "",
                          http_dome: "",
                          remark: "",
                          node: [
                            {
                              name: "",
                              is_have: "",
                              format: "",
                              http_dome: "",
                              remark: "",
                              node: [
                                {
                                  name: "",
                                  is_have: "",
                                  format: "",
                                  http_dome: "",
                                  remark: "",
                                  node: [
                                    {
                                      name: "",
                                      is_have: "",
                                      format: "",
                                      http_dome: "",
                                      remark: "",
                                      node: [
                                        {
                                          name: "",
                                          is_have: "",
                                          format: "",
                                          http_dome: "",
                                          remark: "",
                                          node: [
                                            {
                                              name: "",
                                              is_have: "",
                                              format: "",
                                              http_dome: "",
                                              remark: "",
                                              node: []
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
  state_2.ruleForm_2.returnConfig.push({
    name: "",
    is_have: "",
    format: "",
    http_dome: "",
    remark: "",
    node: [
      {
        name: "",
        is_have: "",
        format: "",
        http_dome: "",
        remark: "",
        node: [
          {
            name: "",
            is_have: "",
            format: "",
            http_dome: "",
            remark: "",
            node: [
              {
                name: "",
                is_have: "",
                format: "",
                http_dome: "",
                remark: "",
                node: [
                  {
                    name: "",
                    is_have: "",
                    format: "",
                    http_dome: "",
                    remark: "",
                    node: [
                      {
                        name: "",
                        is_have: "",
                        format: "",
                        http_dome: "",
                        remark: "",
                        node: [
                          {
                            name: "",
                            is_have: "",
                            format: "",
                            http_dome: "",
                            remark: "",
                            node: [
                              {
                                name: "",
                                is_have: "",
                                format: "",
                                http_dome: "",
                                remark: "",
                                node: [
                                  {
                                    name: "",
                                    is_have: "",
                                    format: "",
                                    http_dome: "",
                                    remark: "",
                                    node: [
                                      {
                                        name: "",
                                        is_have: "",
                                        format: "",
                                        http_dome: "",
                                        remark: "",
                                        node: [
                                          {
                                            name: "",
                                            is_have: "",
                                            format: "",
                                            http_dome: "",
                                            remark: "",
                                            node: []
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  })
  state_2.ruleForm_2.returnConfig.shift()
  state_1.ruleForm_1.BodyConfig = [{ name: "", is_have: "", format: "", dome: "", remark: "" }]
  state.ruleForm.QueryConfig = [{ name: "", is_have: "", format: "", dome: "", remark: "" }]

  radio.value = 0
}

//发送请求
const baseURL = import.meta.env.VITE_BASE_API1
const sendData = () => {
  if (paramFlag.value + bodyFlag.value === 2) {
    // const token = getToken()
    const config = {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }
    if (mockMethod.value === "GET") {
      axios.get(`${baseURL}${derailment.value}`, config).then((res) => {
        ResponseReturn1.value = Object.assign(ResponseReturn1.value, { code: res.status })
        ElMessage.success("响应成功,请前往预览！")
        ResponseReturn.value = "data : " + toJSONString(res.data)
        ResponseReturn1.value = Object.assign(ResponseReturn1.value, { message: res.statusText })
        ResponseReturn1.value = Object.assign(ResponseReturn1.value, { data: res.data })
      })
    } else if (mockMethod.value === "POST") {
      axios.post(`${baseURL}${derailment.value}`, config).then((res) => {
        ResponseReturn1.value = Object.assign(ResponseReturn1.value, { code: res.status })
        ElMessage.success("响应成功,请前往预览！")
        ResponseReturn.value = "data : " + toJSONString(res.data)
        ResponseReturn1.value = Object.assign(ResponseReturn1.value, { message: res.statusText })
        ResponseReturn1.value = Object.assign(ResponseReturn1.value, { data: res.data })
      })
    } else if (mockMethod.value === "PUT") {
      axios.put(`${baseURL}${derailment.value}`, config).then((res) => {
        ResponseReturn1.value = Object.assign(ResponseReturn1.value, { code: res.status })
        ElMessage.success("响应成功,请前往预览！")
        ResponseReturn.value = "data : " + toJSONString(res.data)
        ResponseReturn1.value = Object.assign(ResponseReturn1.value, { message: res.statusText })
        ResponseReturn1.value = Object.assign(ResponseReturn1.value, { data: res.data })
      })
    } else if (mockMethod.value === "DELETE") {
      axios.delete(`${baseURL}${derailment.value}`, config).then((res) => {
        ResponseReturn1.value = Object.assign(ResponseReturn1.value, { code: res.status })
        ElMessage.success("响应成功,请前往预览！")
        ResponseReturn.value = "data : " + toJSONString(res.data)
        ResponseReturn1.value = Object.assign(ResponseReturn1.value, { message: res.statusText })
        ResponseReturn1.value = Object.assign(ResponseReturn1.value, { data: res.data })
      })
    }
  } else {
    ElMessage.error("参数或类型不一致！")
  }
}

const getInterfaceDetailApiFun = (data: string) => {
  if (interfaceId.value === "") return
  const params = {
    interfaceId: data
  }
  getInterfaceDetailApi(params).then((res: any) => {
    if (res.code === 200) {
      update_by.value = res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].update_by
      update_time.value = new Date(
        +new Date(res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].update_time) +
          8 * 3600 * 1000
      )
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "")
      formData.value.name =
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.name
      if (
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.url[0] === "/"
      ) {
        formData.value.url =
          "127.0.0.1" +
          res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.url
      } else
        formData.value.url =
          res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.url
      state.ruleForm.QueryConfig =
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.query
      ResponseParams.value = toJSONString(state.ruleForm)
      state_1.ruleForm_1.BodyConfig =
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.body
      ResponseBody1.value = toJSONString(state_1.ruleForm_1)
      state_2.ruleForm_2.returnConfig =
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.response_data
      if (
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.response_data
          .length === 1 &&
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.response_data[0]
          .format === "" &&
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.response_data[0]
          .http_dome === "" &&
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.response_data[0]
          .is_have === "" &&
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.response_data[0]
          .name === "" &&
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.response_data[0]
          .remark === ""
      ) {
        state_2.ruleForm_2.returnConfig.push({
          name: "",
          is_have: "",
          format: "",
          http_dome: "",
          remark: "",
          node: [
            {
              name: "",
              is_have: "",
              format: "",
              http_dome: "",
              remark: "",
              node: [
                {
                  name: "",
                  is_have: "",
                  format: "",
                  http_dome: "",
                  remark: "",
                  node: [
                    {
                      name: "",
                      is_have: "",
                      format: "",
                      http_dome: "",
                      remark: "",
                      node: [
                        {
                          name: "",
                          is_have: "",
                          format: "",
                          http_dome: "",
                          remark: "",
                          node: [
                            {
                              name: "",
                              is_have: "",
                              format: "",
                              http_dome: "",
                              remark: "",
                              node: [
                                {
                                  name: "",
                                  is_have: "",
                                  format: "",
                                  http_dome: "",
                                  remark: "",
                                  node: [
                                    {
                                      name: "",
                                      is_have: "",
                                      format: "",
                                      http_dome: "",
                                      remark: "",
                                      node: [
                                        {
                                          name: "",
                                          is_have: "",
                                          format: "",
                                          http_dome: "",
                                          remark: "",
                                          node: [
                                            {
                                              name: "",
                                              is_have: "",
                                              format: "",
                                              http_dome: "",
                                              remark: "",
                                              node: [
                                                {
                                                  name: "",
                                                  is_have: "",
                                                  format: "",
                                                  http_dome: "",
                                                  remark: "",
                                                  node: []
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        })
        state_2.ruleForm_2.returnConfig.shift()
      }
      console.log(res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.query)
      if (
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.query ===
        undefined
      ) {
        state.ruleForm.QueryConfig = [{ name: "", is_have: "", format: "", dome: "", remark: "" }]
      }
      if (
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.body === undefined
      ) {
        state_1.ruleForm_1.BodyConfig = [{ name: "", is_have: "", format: "", dome: "", remark: "" }]
      }
      if (
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.response_data ===
        undefined
      ) {
        state_2.ruleForm_2.returnConfig = [
          {
            name: "",
            is_have: "",
            format: "",
            http_dome: "",
            remark: "",
            node: [
              {
                name: "",
                is_have: "",
                format: "",
                http_dome: "",
                remark: "",
                node: [
                  {
                    name: "",
                    is_have: "",
                    format: "",
                    http_dome: "",
                    remark: "",
                    node: [
                      {
                        name: "",
                        is_have: "",
                        format: "",
                        http_dome: "",
                        remark: "",
                        node: [
                          {
                            name: "",
                            is_have: "",
                            format: "",
                            http_dome: "",
                            remark: "",
                            node: [
                              {
                                name: "",
                                is_have: "",
                                format: "",
                                http_dome: "",
                                remark: "",
                                node: [
                                  {
                                    name: "",
                                    is_have: "",
                                    format: "",
                                    http_dome: "",
                                    remark: "",
                                    node: [
                                      {
                                        name: "",
                                        is_have: "",
                                        format: "",
                                        http_dome: "",
                                        remark: "",
                                        node: [
                                          {
                                            name: "",
                                            is_have: "",
                                            format: "",
                                            http_dome: "",
                                            remark: "",
                                            node: [
                                              {
                                                name: "",
                                                is_have: "",
                                                format: "",
                                                http_dome: "",
                                                remark: "",
                                                node: [
                                                  {
                                                    name: "",
                                                    is_have: "",
                                                    format: "",
                                                    http_dome: "",
                                                    remark: "",
                                                    node: []
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  })
  mockConfig()
}

const setCookies = () => {
  ResponseCookies.value = toJSONString(state_4.ruleForm_4)
}

const setHeaders = () => {
  ResponseHeaders.value = toJSONString(state_3.ruleForm_3)
}

const paramFlag = ref<number>(0)
const flag11 = ref<number>(0)
//检查Params
const checkParams = () => {
  flag11.value = 0
  for (let i = 0; i < state_5.ruleForm_5.ParamsConfig.length; i++) {
    const s5P = state_5.ruleForm_5.ParamsConfig[i]

    for (let j = 0; j < state.ruleForm.QueryConfig.length; j++) {
      const sQ = state.ruleForm.QueryConfig[j]
      if (s5P.name === sQ.name) {
        if (s5P.format === sQ.format) {
          flag11.value = flag11.value + 1
          break
        }
      }
    }
  }

  const aux = ref<number>(0)
  const aux1 = ref<number>(0)
  for (let i = 0; i < state.ruleForm.QueryConfig.length; i++) {
    const sQ = state.ruleForm.QueryConfig[i]
    if (sQ.is_have === "必需") {
      aux.value = aux.value + 1
      for (let j = 0; j < state_5.ruleForm_5.ParamsConfig.length; j++) {
        const s5P = state_5.ruleForm_5.ParamsConfig[j]

        if (s5P.name === sQ.name) {
          if (sQ.format === s5P.format) {
            aux1.value = aux1.value + 1
            break
          }
        }
      }
    }
  }

  if (flag11.value != state_5.ruleForm_5.ParamsConfig.length) {
    if (aux.value != 0 && aux1.value != 0) {
      if (aux.value == aux1.value) paramFlag.value = 1
      else paramFlag.value = 3
    } else paramFlag.value = 3
  } else paramFlag.value = 1

  if (
    state_5.ruleForm_5.ParamsConfig.length === 1 &&
    state_5.ruleForm_5.ParamsConfig[0].format === "" &&
    state_5.ruleForm_5.ParamsConfig[0].name === "" &&
    state_5.ruleForm_5.ParamsConfig[0].remark === "" &&
    state_5.ruleForm_5.ParamsConfig[0].value === "" &&
    state.ruleForm.QueryConfig.length === 1 &&
    state.ruleForm.QueryConfig[0].dome === "" &&
    state.ruleForm.QueryConfig[0].format === "" &&
    state.ruleForm.QueryConfig[0].is_have === "" &&
    state.ruleForm.QueryConfig[0].name === "" &&
    state.ruleForm.QueryConfig[0].remark === ""
  ) {
    paramFlag.value = 1
  }
  checkBody()
}

const bodyFlag = ref<number>(0)
//检查Body
const flag22 = ref<number>(0)
const checkBody = () => {
  flag22.value = 0
  for (let i = 0; i < state_6.ruleForm_6.BodyConfig.length; i++) {
    const s5P = state_6.ruleForm_6.BodyConfig[i]
    for (let j = 0; j < state_1.ruleForm_1.BodyConfig.length; j++) {
      const sQ = state_1.ruleForm_1.BodyConfig[j]
      if (s5P.name === sQ.name) {
        if (s5P.format === sQ.format) {
          flag22.value = flag22.value + 1
          break
        }
      }
    }
  }

  const aux = ref<number>(0)
  const aux1 = ref<number>(0)
  for (let i = 0; i < state_1.ruleForm_1.BodyConfig.length; i++) {
    const sQ = state_1.ruleForm_1.BodyConfig[i]
    if (sQ.is_have === "必需") {
      aux.value = aux.value + 1
      for (let j = 0; j < state_6.ruleForm_6.BodyConfig.length; j++) {
        const s5P = state_6.ruleForm_6.BodyConfig[j]
        if (s5P.name === sQ.name) {
          if (s5P.format === sQ.format) {
            aux1.value = aux1.value + 1
            break
          }
        }
      }
    }
  }

  if (flag22.value != state_6.ruleForm_6.BodyConfig.length) {
    if (aux.value != 0 && aux1.value != 0) {
      if (aux.value == aux1.value) bodyFlag.value = 1
      else bodyFlag.value = 3
    } else bodyFlag.value = 3
  } else bodyFlag.value = 1

  ResponseBody.value = toJSONString(state_6.ruleForm_6)

  if (
    state_6.ruleForm_6.BodyConfig.length === 1 &&
    state_6.ruleForm_6.BodyConfig[0].format === "" &&
    state_6.ruleForm_6.BodyConfig[0].name === "" &&
    state_6.ruleForm_6.BodyConfig[0].remark === "" &&
    state_6.ruleForm_6.BodyConfig[0].value === "" &&
    state_1.ruleForm_1.BodyConfig.length === 1 &&
    state_1.ruleForm_1.BodyConfig[0].dome === "" &&
    state_1.ruleForm_1.BodyConfig[0].format === "" &&
    state_1.ruleForm_1.BodyConfig[0].is_have === "" &&
    state_1.ruleForm_1.BodyConfig[0].name === "" &&
    state_1.ruleForm_1.BodyConfig[0].remark === ""
  ) {
    bodyFlag.value = 1
  }

  checkParams()
}

// 跳转项目页
const detail = () => {
  emit("initData")
  // emit("initData")
}

// 保存信息
const save = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      updateTableDataApiFun()
      emit("initData")
      // emit("initData")
    }
  })
  // emit("initData")
}
// 关闭事件
const close = () => {
  formRef.value?.resetFields()
  emit("initData")
  clearResponseReturn()
  dialogVisible.value = false
}

const clearResponseReturn = () => {
  ResponseReturn.value = ""
  ResponseReturn1.value = {}
}

// mock
const mockConfig = () => {
  if (projectStore.projectId === "") {
    ElMessage.error("请选择项目")
    return
  }
  const params = {
    interfaceId: interfaceId.value
  }

  MockInterfaceDetailApi(params).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success(res.message)
      mockUrl.value = res.data.mockUrl
      derailment.value = res.data.mockUrl
    }
  })
}

//修改接口
const updateTableDataApiFun = () => {
  const i1 = ref<number>(0)
  for (let i = 0; i < state_2.ruleForm_2.returnConfig.length; i++) {
    i1.value = i1.value + 1
    if (
      state_2.ruleForm_2.returnConfig[i].format === "" &&
      state_2.ruleForm_2.returnConfig[i].http_dome === "" &&
      state_2.ruleForm_2.returnConfig[i].is_have === "" &&
      state_2.ruleForm_2.returnConfig[i].name === "" &&
      state_2.ruleForm_2.returnConfig[i].remark === ""
    ) {
      if (i1.value > 1) {
        state_2.ruleForm_2.returnConfig.splice(i, 1)
        i = i - 1
      }
    }
    const a1 = ref<number>(0)
    for (let a = 0; a < state_2.ruleForm_2.returnConfig[i].node.length; a++) {
      a1.value = a1.value + 1
      if (
        state_2.ruleForm_2.returnConfig[i].node[a].format === "" &&
        state_2.ruleForm_2.returnConfig[i].node[a].http_dome === "" &&
        state_2.ruleForm_2.returnConfig[i].node[a].is_have === "" &&
        state_2.ruleForm_2.returnConfig[i].node[a].name === "" &&
        state_2.ruleForm_2.returnConfig[i].node[a].remark === ""
      ) {
        if (a1.value > 1) {
          state_2.ruleForm_2.returnConfig[i].node.splice(a, 1)
          a = a - 1
        }
      }
      const b1 = ref<number>(0)
      for (let b = 0; b < state_2.ruleForm_2.returnConfig[i].node[a].node.length; b++) {
        b1.value = b1.value + 1
        if (
          state_2.ruleForm_2.returnConfig[i].node[a].node[b].format === "" &&
          state_2.ruleForm_2.returnConfig[i].node[a].node[b].http_dome === "" &&
          state_2.ruleForm_2.returnConfig[i].node[a].node[b].is_have === "" &&
          state_2.ruleForm_2.returnConfig[i].node[a].node[b].name === "" &&
          state_2.ruleForm_2.returnConfig[i].node[a].node[b].remark === ""
        ) {
          if (b1.value > 1) {
            state_2.ruleForm_2.returnConfig[i].node[a].node.splice(b, 1)
            b = b - 1
          }
        }
        const c1 = ref<number>(0)
        for (let c = 0; c < state_2.ruleForm_2.returnConfig[i].node[a].node[b].node.length; c++) {
          c1.value = c1.value + 1
          if (
            state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].format === "" &&
            state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].http_dome === "" &&
            state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].is_have === "" &&
            state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].name === "" &&
            state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].remark === ""
          ) {
            if (c1.value > 1) {
              state_2.ruleForm_2.returnConfig[i].node[a].node[b].node.splice(c, 1)
              c = c - 1
            }
          }
          const d1 = ref<number>(0)
          for (let d = 0; d < state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node.length; d++) {
            d1.value = d1.value + 1
            if (
              state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].format === "" &&
              state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].http_dome === "" &&
              state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].is_have === "" &&
              state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].name === "" &&
              state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].remark === ""
            ) {
              if (d1.value > 1) {
                state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node.splice(d, 1)
                d = d - 1
              }
            }
            const e1 = ref<number>(0)
            for (let e = 0; e < state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node.length; e++) {
              e1.value = e1.value + 1
              if (
                state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].format === "" &&
                state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].http_dome === "" &&
                state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].is_have === "" &&
                state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].name === "" &&
                state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].remark === ""
              ) {
                if (e1.value > 1) {
                  state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node.splice(e, 1)
                  e = e - 1
                }
              }
              const f1 = ref<number>(0)
              for (
                let f = 0;
                f < state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node.length;
                f++
              ) {
                f1.value = f1.value + 1
                if (
                  state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].format === "" &&
                  state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].http_dome === "" &&
                  state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].is_have === "" &&
                  state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].name === "" &&
                  state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].remark === ""
                ) {
                  if (f1.value > 1) {
                    state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node.splice(f, 1)
                    f = f - 1
                  }
                }
                const g1 = ref<number>(0)
                for (
                  let g = 0;
                  g < state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node.length;
                  g++
                ) {
                  g1.value = g1.value + 1
                  if (
                    state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g]
                      .format === "" &&
                    state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g]
                      .http_dome === "" &&
                    state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g]
                      .is_have === "" &&
                    state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g].name ===
                      "" &&
                    state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g]
                      .remark === ""
                  ) {
                    if (g1.value > 1) {
                      state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node.splice(
                        g,
                        1
                      )
                      g = g - 1
                    }
                  }
                  const h1 = ref<number>(0)
                  for (
                    let h = 0;
                    h <
                    state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g].node
                      .length;
                    h++
                  ) {
                    h1.value = h1.value + 1
                    if (
                      state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g].node[h]
                        .format === "" &&
                      state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g].node[h]
                        .http_dome === "" &&
                      state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g].node[h]
                        .is_have === "" &&
                      state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g].node[h]
                        .name === "" &&
                      state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g].node[h]
                        .remark === ""
                    ) {
                      if (h1.value > 1) {
                        state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[
                          g
                        ].node.splice(h, 1)
                        h = h - 1
                      }
                    }
                    const k1 = ref<number>(0)
                    for (
                      let k = 0;
                      k <
                      state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g].node[h]
                        .node.length;
                      k++
                    ) {
                      k1.value = k1.value + 1
                      if (
                        state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g].node[
                          h
                        ].node[k].format === "" &&
                        state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g].node[
                          h
                        ].node[k].http_dome === "" &&
                        state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g].node[
                          h
                        ].node[k].is_have === "" &&
                        state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g].node[
                          h
                        ].node[k].name === "" &&
                        state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g].node[
                          h
                        ].node[k].remark === ""
                      ) {
                        if (k1.value > 1) {
                          state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[
                            g
                          ].node[h].node.splice(k, 1)
                          k = k - 1
                        }
                      }
                      const m1 = ref<number>(0)
                      for (
                        let m = 0;
                        m <
                        state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g].node[
                          h
                        ].node[k].node.length;
                        m++
                      ) {
                        m1.value = m1.value + 1
                        if (
                          state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g]
                            .node[h].node[k].node[m].format === "" &&
                          state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g]
                            .node[h].node[k].node[m].http_dome === "" &&
                          state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g]
                            .node[h].node[k].node[m].is_have === "" &&
                          state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g]
                            .node[h].node[k].node[m].name === "" &&
                          state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[g]
                            .node[h].node[k].node[m].remark === ""
                        ) {
                          if (m1.value > 1) {
                            state_2.ruleForm_2.returnConfig[i].node[a].node[b].node[c].node[d].node[e].node[f].node[
                              g
                            ].node[h].node[k].node.splice(m, 1)
                            m = m - 1
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  const params = {
    interfaceId: interfaceId.value,
    name: formData.value.name,
    url: formData.value.url,
    method: formData.value.method,
    query: state.ruleForm.QueryConfig,
    responseData: state_2.ruleForm_2.returnConfig,
    body: state_1.ruleForm_1.BodyConfig
  }
  updateInterfaceDataApi(params).then((res: any) => {
    if (res.code === 200) {
      if (formData.value.method === "GET") flag_10.value = false
      else flag_10.value = true
      ElMessage.success(res.message)
      formData.value.query = state.ruleForm.QueryConfig
      formData.value.responseData = state_2.ruleForm_2.returnConfig
      formData.value.body = state_1.ruleForm_1.BodyConfig
      ResponseParams.value = toJSONString(state.ruleForm)
      ResponseBody1.value = toJSONString(state_1.ruleForm_1)
      urlRunConfig.value = "local: http://" + formData.value.url
      methodRun.value = formData.value.method
      emit("initData")
      detail()
    }
  })
}

const resetTableData = () => {
  const params = {
    interfaceId: interfaceId.value
  }
  getInterfaceDetailApi(params).then((res: any) => {
    if (res.code === 200) {
      state_2.ruleForm_2.returnConfig =
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.response_data
      if (
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.response_data
          .length === 1 &&
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.response_data[0]
          .format === "" &&
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.response_data[0]
          .http_dome === "" &&
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.response_data[0]
          .is_have === "" &&
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.response_data[0]
          .name === "" &&
        res.data.interfaceDetail.interfaces[res.data.interfaceDetail.interfaces.length - 1].interface.response_data[0]
          .remark === ""
      ) {
        state_2.ruleForm_2.returnConfig.push({
          name: "",
          is_have: "",
          format: "",
          http_dome: "",
          remark: "",
          node: [
            {
              name: "",
              is_have: "",
              format: "",
              http_dome: "",
              remark: "",
              node: [
                {
                  name: "",
                  is_have: "",
                  format: "",
                  http_dome: "",
                  remark: "",
                  node: [
                    {
                      name: "",
                      is_have: "",
                      format: "",
                      http_dome: "",
                      remark: "",
                      node: [
                        {
                          name: "",
                          is_have: "",
                          format: "",
                          http_dome: "",
                          remark: "",
                          node: [
                            {
                              name: "",
                              is_have: "",
                              format: "",
                              http_dome: "",
                              remark: "",
                              node: [
                                {
                                  name: "",
                                  is_have: "",
                                  format: "",
                                  http_dome: "",
                                  remark: "",
                                  node: [
                                    {
                                      name: "",
                                      is_have: "",
                                      format: "",
                                      http_dome: "",
                                      remark: "",
                                      node: [
                                        {
                                          name: "",
                                          is_have: "",
                                          format: "",
                                          http_dome: "",
                                          remark: "",
                                          node: [
                                            {
                                              name: "",
                                              is_have: "",
                                              format: "",
                                              http_dome: "",
                                              remark: "",
                                              node: [
                                                {
                                                  name: "",
                                                  is_have: "",
                                                  format: "",
                                                  http_dome: "",
                                                  remark: "",
                                                  node: []
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        })
        state_2.ruleForm_2.returnConfig.shift()
      }
    }
  })
}

// json编辑器
const editProject = (row: any) => {
  console.log(row._id)
  const obj = {
    id: 1,
    title: "开发接口",
    detailMsg: formData.value,
    responseData: state_2.ruleForm_2.returnConfig
  }

  InterfaceDevelopmentRef1.value?.show(obj)
}

defineExpose({
  show
})
</script>
<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
