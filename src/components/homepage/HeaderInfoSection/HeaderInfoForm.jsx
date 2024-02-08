import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../AdminNavbar';
import { BASE_URL } from '../../../../config';

function HeaderInfoForm() {
  const { handleSubmit, control, setValue, getValues } = useForm();

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch(`${BASE_URL}/api/createHeaderInfoSection`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const res = await response.json();
      window.alert(res.message)
      navigate('/homePage')
    } catch (error) {
      console.log("error saving image section", error)
    }
  };

  const handleAddSection = () => {
    setValue('sections', [...getValues('sections'), { sectionName: '', content: [] }]);
  };

  const handleAddContent = (sectionIndex) => {
    const sections = getValues('sections');
    sections[sectionIndex].content.push({ subheader: '', paragraph: '', icon: '' });
    setValue('sections', sections);
  };

  return (
    <>
    <AdminNavbar/>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 border rounded-md shadow-md mt-10">
        <div className="mb-6">
          <label htmlFor="headerTitle" className="block text-sm font-medium leading-5 text-gray-700">
            Header Title
          </label>
          <Controller
            name="headerTitle"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              />
            )}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium leading-5 text-gray-700">Sections</label>
          <Controller
            name="sections"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <div>
                {field.value.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mt-4">
                    <label htmlFor={`sections[${sectionIndex}].sectionName`} className="block text-sm font-medium leading-5 text-gray-700">
                      Section {sectionIndex + 1} Name
                    </label>
                    <Controller
                      name={`sections[${sectionIndex}].sectionName`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                        />
                      )}
                    />

                    <label className="block text-sm font-medium leading-5 text-gray-700 mt-4">Content</label>
                    <div>
                      {section.content.map((content, contentIndex) => (
                        <div key={contentIndex} className="mt-4">
                          <label htmlFor={`sections[${sectionIndex}].content[${contentIndex}].subheader`} className="block text-sm font-medium leading-5 text-gray-700">
                            Subheader {contentIndex + 1}
                          </label>
                          <Controller
                            name={`sections[${sectionIndex}].content[${contentIndex}].subheader`}
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                              />
                            )}
                          />

                          <label htmlFor={`sections[${sectionIndex}].content[${contentIndex}].paragraph`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                            Paragraph {contentIndex + 1}
                          </label>
                          <Controller
                            name={`sections[${sectionIndex}].content[${contentIndex}].paragraph`}
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <textarea
                                {...field}
                                rows="3"
                                className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                              />
                            )}
                          />

                          <label htmlFor={`sections[${sectionIndex}].content[${contentIndex}].icon`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                            Icon {contentIndex + 1}
                          </label>
                          <Controller
                            name={`sections[${sectionIndex}].content[${contentIndex}].icon`}
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                              />
                            )}
                          />
                        </div>
                      ))}
                      <button type="button" onClick={() => handleAddContent(sectionIndex)} className="text-indigo-600 hover:text-indigo-900 mt-4">
                        Add Content
                      </button>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={handleAddSection} className="text-indigo-600 hover:text-indigo-900 mt-4">
                  Add Section
                </button>
              </div>
            )}
          />
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-indigo-500 p-3 rounded-md text-white font-medium focus:outline-none focus:shadow-outline-indigo active:bg-indigo-600"
          >
            Create Header
          </button>
        </div>
      </form>
    </>
  );
}

export default HeaderInfoForm;
